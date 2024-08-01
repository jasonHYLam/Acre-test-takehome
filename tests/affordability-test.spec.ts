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
  { mortgage: { propertyValue: 0 }, income: { grossIncome: 0 } },
  { mortgage: { propertyValue: 1000000 }, income: { grossIncome: 100000 } },
  {},
].forEach((input) => {
  test(`with ${input.mortgage.propertyValue} property value and ${input.income.grossIncome} income`, async ({
    page,
  }) => {
    await page.goto(CALCULATOR_URL);
    if (input.mortgage) {
      if (input.mortgage.propertyValue || input.mortgage.propertyValue === 0) {
        await page.getByText("1 Mortgage Details").click();
        await page.getByLabel("Property Value:").click();
        await page
          .getByLabel("Property Value:")
          .fill(input.mortgage.propertyValue.toString());
        await page.getByLabel("Property Value:").press("Enter");
      }
    }

    if (input.income) {
      if (input.income.grossIncome || input.income.grossIncome === 0) {
        await page.getByText("2 Income").click();
        await page.getByRole("spinbutton", { name: "Gross Income:" }).click();
        await page
          .getByRole("spinbutton", { name: "Gross Income:" })
          .fill("100000");
        await page
          .getByRole("spinbutton", { name: "Gross Income:" })
          .press("Enter");
      }
    }

    await page.getByText("view", { exact: true }).click();
    await expect(page.locator("#result-errors")).toBeVisible();
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
