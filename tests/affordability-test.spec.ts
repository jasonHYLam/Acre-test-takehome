// @ts-check

const CALCULATOR_URL =
  "https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php";
const TITLE = "Affordability calculator | HSBC for Intermediaries";

import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(CALCULATOR_URL);
  await expect(page).toHaveTitle(TITLE);
});
