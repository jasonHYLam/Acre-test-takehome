// @ts-check

const CALCULATOR_URL =
  "https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php";
const TITLE = "Affordability Calculator | HSBC UK for Intermediaries";

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

// Table test which takes array of input and applies the same test to each.
[
  { mortgageDetails: { propertyValue: 0 }, incomeDetails: { grossIncome: 0 } },
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 100000 },
  },
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: {
      grossIncome: 100000,
      foreignCurrency: false,
    },
  },
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

    if (validIncomeDetailsForLending && validMortgageDetailsForLending) {
      await expect(page.locator("#result-errors")).toBeHidden();
    } else {
      await expect(page.locator("#result-errors")).toBeVisible();
    }
    await expect(page.locator("#lendingBasedOnProperty")).toContainText("0");
    await expect(page.locator("#resultantLTV")).toContainText("0");
    await expect(page.locator("#lendingBasedOnAffordability")).toContainText(
      "NOT AVAILABLE"
    );
  });
});
// Test providing income but no mortgage details results in no lending

// Test providing string rather than number expected input results in error
// Test providing negative number rather than positive number expected input results in error

// Test closing tab
// Test filling input then closing tab then reopening tab
