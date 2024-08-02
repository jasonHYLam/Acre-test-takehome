// @ts-check

import { test, expect } from "@playwright/test";
import { testData } from "./testData/testData";

import {
  CALCULATOR_URL,
  TITLE,
  MIN_PROPERTY_VALUE,
  MIN_INCOME_VALUE,
  MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING,
} from "../helpers/constants";
import {
  checkValidIncomeDetailsForLending,
  checkValidMortgageDetailsForLending,
} from "../helpers/utils";

// Table test which takes array of input and applies the same test to each.
// Input data is an object containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
testData.forEach((input, index) => {
  // TODO: Add descriptive names to input data
  // TODO: Split up sections into separate modules
  const testTitle = `Test ${index + 1}`;
  test(testTitle, async ({ page }) => {
    await page.goto(CALCULATOR_URL);
    if (input.mortgageDetails) {
      await page.getByText("1 Mortgage Details").click();
      if (
        input.mortgageDetails.propertyValue ||
        input.mortgageDetails.propertyValue === 0
      ) {
        await page.getByLabel("Property Value:").click();
        await page
          .getByLabel("Property Value:")
          .fill(input.mortgageDetails.propertyValue.toString());
        await page.getByLabel("Property Value:").press("Enter");
      }
    }

    if (input.allIncomeDetails) {
      await page.getByText("2 Income").click();
      const { applicant1IncomeDetails, applicant2IncomeDetails } =
        input.allIncomeDetails;
      if (applicant1IncomeDetails) {
        if (
          applicant1IncomeDetails.grossIncome ||
          applicant1IncomeDetails.grossIncome === 0
        ) {
          await page.getByRole("spinbutton", { name: "Gross Income:" }).click();
          await page
            .getByRole("spinbutton", { name: "Gross Income:" })
            .fill("100000");
          await page
            .getByRole("spinbutton", { name: "Gross Income:" })
            .press("Enter");
        }

        if (
          applicant1IncomeDetails.foreignCurrency ||
          applicant1IncomeDetails.foreignCurrency === false
        ) {
          await page.getByRole("button", { name: "Nothing selected" }).click();
          await page
            .getByRole("menu")
            .locator("a")
            .filter({ hasText: "No" })
            .click();
        }
      }
    }

    if (input.allExpenditureDetails) {
      await page.getByText("3 Expenditure").click();

      const { applicant1ExpenditureDetails, applicant2ExpenditureDetails } =
        input.allExpenditureDetails;

      if (applicant1ExpenditureDetails) {
        if (
          applicant1ExpenditureDetails.monthlyBTLOutgoings ||
          applicant1ExpenditureDetails.monthlyBTLOutgoings === 0
        ) {
          await page
            .getByRole("spinbutton", { name: "Existing Monthly BTL" })
            .click();
          await page
            .getByRole("spinbutton", { name: "Existing Monthly BTL" })
            .fill(applicant1ExpenditureDetails.monthlyBTLOutgoings.toString());
          await page
            .getByRole("spinbutton", { name: "Existing Monthly BTL" })
            .press("Enter");
        }
      }
    }

    await page.getByText("view", { exact: true }).click();

    const validMortgageDetailsForLending =
      checkValidMortgageDetailsForLending(input);

    const validIncomeDetailsForLending =
      checkValidIncomeDetailsForLending(input);

    // Check scenarios where minimum criteria for lending are met.
    if (validIncomeDetailsForLending && validMortgageDetailsForLending) {
      await expect(page.locator("#result-errors")).toBeHidden();
      await expect(page.locator("#lendingBasedOnProperty")).toBeVisible();

      // These values are formatted as strings when displayed on the page and must be converted to numbers for the following comparison.
      const lendingBasedOnPropertyAsString = await page
        .locator("#lendingBasedOnProperty")
        .textContent();
      const lendingBasedOnPropertyAsInt = Number(
        lendingBasedOnPropertyAsString
      );

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
  });
});
