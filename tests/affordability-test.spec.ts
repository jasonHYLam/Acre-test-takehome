// @ts-check

const CALCULATOR_URL = "https://intermediaries.hsbc.co.uk/calculator/";

import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(CALCULATOR_URL);
});
