// @ts-check

const CALCULATOR_URL =
  "https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php";
const TITLE = "Affordability Calculator | HSBC UK for Intermediaries";

import { test, expect } from "@playwright/test";

test("not filling in user details results in no lending and validation errors", async ({
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
