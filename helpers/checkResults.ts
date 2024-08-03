// @ts-check

import { expect, Page } from "@playwright/test";
import { ProvidedDetails } from "./types";
import {
  MIN_PROPERTY_VALUE,
  MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING,
} from "./constants";
import {
  checkValidMortgageDetailsForLending,
  checkValidIncomeDetailsForLending,
} from "./utils";

export async function checkResults(page: Page, input: ProvidedDetails) {
  await page.getByText("view", { exact: true }).click();

  const validMortgageDetailsForLending =
    checkValidMortgageDetailsForLending(input);

  const validIncomeDetailsForLending = checkValidIncomeDetailsForLending(input);

  // Check scenarios where minimum criteria for lending are met.
  if (validIncomeDetailsForLending && validMortgageDetailsForLending) {
    await expect(page.locator("#result-errors")).toBeHidden();
    await expect(page.locator("#lendingBasedOnProperty")).toBeVisible();

    // These values are formatted as strings when displayed on the page and must be converted to numbers for the following comparison.
    const lendingBasedOnPropertyAsString = await page
      .locator("#lendingBasedOnProperty")
      .textContent();
    const lendingBasedOnPropertyAsInt = Number(lendingBasedOnPropertyAsString);

    await expect(page.locator("#resultantLTV")).toBeVisible();
    const resultantLTVAsString = await page
      .locator("#resultantLTV")
      .textContent();
    const resultantLTVAsInt = Number(resultantLTVAsString);

    // Check that lending values are greater than 0 if input property value >= MIN_PROPERTY_VALUE.
    if (input.mortgageDetails?.propertyValue) {
      if (input.mortgageDetails.propertyValue >= MIN_PROPERTY_VALUE) {
        // Case where income is too low compared to property value.
        // TODO: Change to total income rather than gross income.
        // ^ May require function to calculate at the start.
        if (input.allIncomeDetails?.applicant1IncomeDetails?.grossIncome) {
          const { grossIncome } =
            input.allIncomeDetails.applicant1IncomeDetails;
          if (
            grossIncome / input.mortgageDetails.propertyValue <
            MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING
          ) {
            expect(resultantLTVAsInt).toBe(0);
          }
          // TODO: Test case where expenditure exceeds maximum, such that lending is 0.
          // ^ This might be based on ratio of income to expenditure...
          // if (input.expenditureDetails) {
          //   expect(resultantLTVAsString).toContain()
          // }
        } else {
          expect(resultantLTVAsInt).toBeGreaterThan(0);
          expect(lendingBasedOnPropertyAsInt).toBeGreaterThan(0);
        }
      }

      // Check edge case where property value is less than or equal to 0.
      else if (input.mortgageDetails.propertyValue <= 0) {
        await expect(page.locator("#result-errors")).toBeVisible();
        await expect(page.locator("#lendingBasedOnProperty")).toContainText(
          "0"
        );
        await expect(page.locator("#resultantLTV")).toContainText("0");
        await expect(
          page.locator("#lendingBasedOnAffordability")
        ).toContainText("NOT AVAILABLE");
      }

      // Check all other cases where property value is between 0 and minimum value for lending.
      else {
        await expect(page.locator("#lendingBasedOnProperty")).toContainText(
          "NOT AVAILABLE"
        );
        await expect(page.locator("#resultantLTV")).toContainText("0");
        await expect(
          page.locator("#lendingBasedOnAffordability")
        ).toContainText("NOT AVAILABLE");
      }
    }
  }

  // Check scenarios where minimum criteria for lending are NOT met.
  else {
    // If valid details are not provided, expect errors to be displayed.
    await expect(page.locator("#result-errors")).toBeVisible();
    await expect(page.locator("#lendingBasedOnProperty")).toContainText("0");
    await expect(page.locator("#resultantLTV")).toContainText("0");
    await expect(page.locator("#lendingBasedOnAffordability")).toContainText(
      "NOT AVAILABLE"
    );
  }
}
