// @ts-check

import { expect, Page } from "@playwright/test";
import { ExpectedResult, ProvidedDetails } from "./types";
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

export async function checkResults(
  page: Page,
  providedDetails: ProvidedDetails,
  expectedResult: ExpectedResult
) {
  await page.getByText("view", { exact: true }).click();

  const resultErrorsLocator = page.locator("#result-errors");
  const lendingBasedOnPropertyLocator = page.locator("#lendingBasedOnProperty");
  const resultantLTVLocator = page.locator("#resultantLTV");
  const lendingBasedOnAffordabilityLocator = page.locator(
    "#lendingBasedOnAffordability"
  );

  const {
    resultErrors,
    lendingBasedOnProperty,
    resultantLTV,
    lendingBasedOnAffordability,
  } = expectedResult;

  const validMortgageDetailsForLending =
    checkValidMortgageDetailsForLending(providedDetails);

  // This seems to miss test 5 where foreignCurrency is not given
  const validIncomeDetailsForLending =
    checkValidIncomeDetailsForLending(providedDetails);

  // Checks scenarios where minimum criteria for lending are met.
  if (validIncomeDetailsForLending && validMortgageDetailsForLending) {
    await expect(resultErrorsLocator).toBeHidden();
    await expect(lendingBasedOnPropertyLocator).toBeVisible();

    // TODO: Create helper functions to return numerical values
    // These values are formatted as strings when displayed on the page and must be converted to numbers for the following comparison.
    const lendingBasedOnPropertyAsString =
      await lendingBasedOnPropertyLocator.textContent();
    const lendingBasedOnPropertyAsInt = Number(lendingBasedOnPropertyAsString);

    expect(resultantLTVLocator).toBeVisible();
    const resultantLTVAsString = await resultantLTVLocator.textContent();
    const resultantLTVAsInt = Number(resultantLTVAsString);

    // Checks that lending values are greater than 0 if input property value >= MIN_PROPERTY_VALUE.
    if (providedDetails.mortgageDetails?.propertyValue) {
      const { propertyValue } = providedDetails.mortgageDetails;
      if (propertyValue >= MIN_PROPERTY_VALUE) {
        // Cases when (some) income details are provided.
        if (providedDetails.allIncomeDetails) {
          const totalIncome = calculateTotalIncome(
            providedDetails.allIncomeDetails
          );

          // TODO: Consider foreignCurrency. If it exists, it will reduce lending, possibly result in no lending.
          // TODO: Consider assess on interest only basis; if yes, it will increase lending but may not affect expenditure's effect on lending.
          // TODO: Consider mortgage term; increasing it will increase lending

          // Cases when gross income is existent.
          if (
            providedDetails.allIncomeDetails.applicant1IncomeDetails
              ?.grossIncome
          ) {
            const { grossIncome } =
              providedDetails.allIncomeDetails.applicant1IncomeDetails;

            // Checks when expenditure exists
            if (providedDetails.allExpenditureDetails) {
              const totalExpenditure = calculateTotalExpenditure(
                providedDetails.allExpenditureDetails
              );

              // Cases where expenditure exceeds maximum (based on expenditure to income ratio), such that lending is 0.
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

              // Cases where expenditure doesn't exceed maximum. There are edge cases however, like when both income and expenditure are low.
              else {
                // TODO: Handle case when gross income is minimum; results in no lending
              }
            }

            // Cases when expenditure is nill.
            else {
              // Case where income is too low compared to property value for lending.
              // TODO: Add to if block; consider ratio of total income to property ratio.
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
      else if (providedDetails.mortgageDetails.propertyValue <= 0) {
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
    // TODO: Handle expectedResults!
    await expect(resultErrorsLocator).toBeVisible();
    await expect(lendingBasedOnPropertyLocator).toContainText("0");
    await expect(resultantLTVLocator).toContainText("0");
    await expect(lendingBasedOnAffordabilityLocator).toContainText(
      "NOT AVAILABLE"
    );
  }
}
