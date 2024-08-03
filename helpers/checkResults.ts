// @ts-check

import { expect, Page } from "@playwright/test";
import { ProvidedDetails } from "./types";
import {
  MIN_PROPERTY_VALUE,
  MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING,
  MAX_EXPENDITURE_TO_INCOME_RATIO_FOR_LENDING,
} from "./constants";
import {
  checkValidMortgageDetailsForLending,
  checkValidIncomeDetailsForLending,
  calculateTotalExpenditure,
  calculateTotalIncome,
} from "./utils";

export async function checkResults(page: Page, input: ProvidedDetails) {
  await page.getByText("view", { exact: true }).click();

  const resultErrorsLocator = page.locator("#result-errors");
  const lendingBasedOnPropertyLocator = page.locator("#lendingBasedOnProperty");
  const resultantLTVLocator = page.locator("#resultantLTV");
  const lendingBasedOnAffordabilityLocator = page.locator(
    "#lendingBasedOnAffordability"
  );

  const validMortgageDetailsForLending =
    checkValidMortgageDetailsForLending(input);

  // This seems to miss test 5 where foreignCurrency is not given
  const validIncomeDetailsForLending = checkValidIncomeDetailsForLending(input);

  // Checks scenarios where minimum criteria for lending are met.
  if (validIncomeDetailsForLending && validMortgageDetailsForLending) {
    await expect(resultErrorsLocator).toBeHidden();
    await expect(lendingBasedOnPropertyLocator).toBeVisible();

    // These values are formatted as strings when displayed on the page and must be converted to numbers for the following comparison.
    const lendingBasedOnPropertyAsString =
      await lendingBasedOnPropertyLocator.textContent();
    const lendingBasedOnPropertyAsInt = Number(lendingBasedOnPropertyAsString);

    expect(resultantLTVLocator).toBeVisible();
    const resultantLTVAsString = await resultantLTVLocator.textContent();
    const resultantLTVAsInt = Number(resultantLTVAsString);

    // Checks that lending values are greater than 0 if input property value >= MIN_PROPERTY_VALUE.
    if (input.mortgageDetails?.propertyValue) {
      const { propertyValue } = input.mortgageDetails;
      if (propertyValue >= MIN_PROPERTY_VALUE) {
        // Cases when (some) income details are provided.
        if (input.allIncomeDetails) {
          const totalIncome = calculateTotalIncome(input.allIncomeDetails);

          // Cases when gross income is existent.
          if (input.allIncomeDetails.applicant1IncomeDetails?.grossIncome) {
            const { grossIncome } =
              input.allIncomeDetails.applicant1IncomeDetails;

            // Checks when expenditure exists
            // TODO: Test case where expenditure exceeds maximum, such that lending is 0.
            // ^ This might be based on ratio of income to expenditure...
            if (input.allExpenditureDetails) {
              const totalExpenditure = calculateTotalExpenditure(
                input.allExpenditureDetails
              );

              if (
                totalExpenditure / grossIncome >
                MAX_EXPENDITURE_TO_INCOME_RATIO_FOR_LENDING
              ) {
                expect(lendingBasedOnPropertyLocator).toContainText(
                  "NOT AVAILABLE"
                );
                expect(resultantLTVLocator).toContainText("0");
                await expect(lendingBasedOnAffordabilityLocator).toContainText(
                  "NOT AVAILABLE"
                );
              }
            }

            // Checks when no expenditure exists
            else {
              // Case where income is too low compared to property value for lending.
              // TODO: Change to total income rather than gross income.
              // There is a strange relationship; gross income seems to hold more weight compared to the other income inputs. So the above TODO may not be relevant
              if (
                grossIncome / propertyValue <
                MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING
              ) {
                expect(resultantLTVAsInt).toBe(0);
              }

              // Case where income is great enough compared to property value to allow lending.
              else {
                expect(resultantLTVAsInt).toBeGreaterThan(0);
                expect(lendingBasedOnPropertyAsInt).toBeGreaterThan(0);
              }
            }
          }
        }
      }

      // Checks edge cases where property value is less than or equal to 0.
      else if (input.mortgageDetails.propertyValue <= 0) {
        await expect(resultErrorsLocator).toBeVisible();
        await expect(lendingBasedOnPropertyLocator).toContainText("0");
        await expect(resultantLTVLocator).toContainText("0");
        await expect(lendingBasedOnAffordabilityLocator).toContainText(
          "NOT AVAILABLE"
        );
      }

      // Checks all other cases where property value is between 0 and minimum value for lending.
      else {
        await expect(lendingBasedOnPropertyLocator).toContainText(
          "NOT AVAILABLE"
        );
        await expect(resultantLTVLocator).toContainText("0");
        await expect(lendingBasedOnAffordabilityLocator).toContainText(
          "NOT AVAILABLE"
        );
      }
    }
  }

  // Checks scenarios where minimum criteria for lending are NOT met.
  else {
    // If valid details are not provided, expect errors to be displayed.
    await expect(resultErrorsLocator).toBeVisible();
    await expect(lendingBasedOnPropertyLocator).toContainText("0");
    await expect(resultantLTVLocator).toContainText("0");
    await expect(lendingBasedOnAffordabilityLocator).toContainText(
      "NOT AVAILABLE"
    );
  }
}
