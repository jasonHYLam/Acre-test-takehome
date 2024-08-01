// @ts-check

const CALCULATOR_URL =
  "https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php";
const TITLE = "Affordability Calculator | HSBC UK for Intermediaries";

// The minimum property value required for lending for the HSBC affordability calculator for intermediaries. This may vary for different calculators.
const MIN_PROPERTY_VALUE = 50000;

// TODO: Set value for expenditure that causes 0 lending

// TODO: Perhaps set ratio for income/expenditure

import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

beforeEach();

test.skip("not filling in user details results in no lending and validation errors", async ({
  page,
}) => {
  await page.goto(CALCULATOR_URL);
  await expect(page).toHaveTitle(TITLE);

  await page.getByText("view", { exact: true }).click();

  await expect(page.getByText("The Any element of foreign")).toBeVisible();
  await expect(page.getByText("The Property Value field")).toBeVisible();
  await expect(page.locator("#lendingBasedOnProperty")).toContainText("0");
  await expect(page.locator("#resultantLTV")).toContainText("0");
  await expect(page.locator("#lendingBasedOnAffordability")).toContainText(
    "NOT AVAILABLE"
  );
});

// Test providing mortgage details but no income results in no lending
test.skip("providing property value but no income results in no lending", async ({
  page,
}) => {
  await page.goto(CALCULATOR_URL);
  await expect(page).toHaveTitle(TITLE);

  await page.getByText("1 Mortgage Details").click();
  await page.getByLabel("Property Value:").click();
  await page.getByLabel("Property Value:").fill("1000000");
  await page.getByLabel("Property Value:").press("Enter");
  await page.getByRole("button", { name: "Next step" }).click();
  await page.getByText("view", { exact: true }).click();
  await expect(page.locator("#result-errors")).toBeVisible();
  await expect(page.locator("#lendingBasedOnProperty")).toContainText("0");
  await expect(page.locator("#resultantLTV")).toContainText("0");
  await expect(page.locator("#lendingBasedOnAffordability")).toContainText(
    "NOT AVAILABLE"
  );
});

// TODO: Add input for expenditure, and create branch for that
// TODO: Add to income and mortgage details
// TODO: Consider average user; 30-40 years old, etc.
// TODO: Case where expenditure is great enough to cause no lending

// Table test which takes array of input and applies the same test to each.
// Input data is an object containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
[
  // Input data for scenario where lending is given, as minimum details for lending are given.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: {
      grossIncome: 100000,
      foreignCurrency: false,
    },
  },

  // Input data for scenario where lending is not given, as expenditure is too great.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 100000 },
    expenditureDetails: { monthlyBTLOutgoings: 3700 },
  },

  // Input data for scenario where lending is not given, as foreignCurrency is not provided.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 100000 },
  },

  // Input data for scenario where lending is not given, as propertyValue is 0.
  {
    mortgageDetails: { propertyValue: 0 },
    incomeDetails: { grossIncome: 0, foreignCurrency: false },
  },

  // Input data for scenario where lending is not given, as propertyValue is a negative integer.
  {
    mortgageDetails: { propertyValue: -1 },
    incomeDetails: { grossIncome: 0, foreignCurrency: false },
  },

  // Input data for scenario where lending is not given, as propertyValue is below minimum property value.
  {
    mortgageDetails: { propertyValue: 1 },
    incomeDetails: { grossIncome: 100000, foreignCurrency: false },
  },

  // Input data for scenario where no details are provided.
  {},
].forEach((input, index) => {
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

    if (input.incomeDetails) {
      await page.getByText("2 Income").click();
      if (
        input.incomeDetails.grossIncome ||
        input.incomeDetails.grossIncome === 0
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
        input.incomeDetails.foreignCurrency ||
        input.incomeDetails.foreignCurrency === false
      ) {
        await page.getByRole("button", { name: "Nothing selected" }).click();
        await page
          .getByRole("menu")
          .locator("a")
          .filter({ hasText: "No" })
          .click();
      }
    }

    if (input.expenditureDetails) {
      await page.getByText("3 Expenditure").click();

      if (
        input.expenditureDetails.monthlyBTLOutgoings ||
        input.expenditureDetails.monthlyBTLOutgoings === 0
      ) {
        await page
          .getByRole("spinbutton", { name: "Existing Monthly BTL" })
          .click();
        await page
          .getByRole("spinbutton", { name: "Existing Monthly BTL" })
          .fill(input.expenditureDetails.monthlyBTLOutgoings.toString());
        await page
          .getByRole("spinbutton", { name: "Existing Monthly BTL" })
          .press("Enter");
      }
    }

    await page.getByText("view", { exact: true }).click();

    const validMortgageDetailsForLending =
      input.mortgageDetails &&
      (input.mortgageDetails.propertyValue ||
        input.mortgageDetails.propertyValue === 0);

    const validIncomeDetailsForLending =
      input.incomeDetails &&
      (input.incomeDetails.grossIncome ||
        input.incomeDetails.grossIncome === 0) &&
      (input.incomeDetails.foreignCurrency ||
        input.incomeDetails.foreignCurrency === false);

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
      if (input.mortgageDetails.propertyValue >= MIN_PROPERTY_VALUE) {
        expect(resultantLTVAsInt).toBeGreaterThan(0);
        expect(lendingBasedOnPropertyAsInt).toBeGreaterThan(0);
      }

      // Check edge case where property value is less than or equal to 0.
      else if (input.mortgageDetails.propertyValue <= 0) {
        // Error text is displayed when property value is less than or equal to 0.
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
// Test providing income but no mortgage details results in no lending

// Test providing string rather than number expected input results in error
// Test providing negative number rather than positive number expected input results in error

// Test closing tab
// Test filling input then closing tab then reopening tab
