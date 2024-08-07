// @ts-check

import { expect, Page } from "@playwright/test";
import { ExpectedResult } from "./types";

// This compares the expectedResult of each testEntry to the actual result when filling in the form with the providedDetails.
// The following results are compared:
// - The value of lending based on property
// - The value of resultant LTV
// - The value of lending based on affordability
// - Whether any result errors occur

export async function checkResults(page: Page, expectedResult: ExpectedResult) {
  await page.getByText("view", { exact: true }).click();

  const resultErrorsLocator = page.locator("#result-errors");
  const lendingBasedOnPropertyLocator = page.locator("#lendingBasedOnProperty");
  const resultantLTVLocator = page.locator("#resultantLTV");
  const lendingBasedOnAffordabilityLocator = page.locator(
    "#lendingBasedOnAffordability"
  );

  const {
    resultErrors,
    lendingBasedOnPropertyValue,
    resultantLTV,
    lendingBasedOnAffordabilityValue,
  } = expectedResult;

  if (resultErrors) {
    await expect(resultErrorsLocator).toBeVisible();
  } else {
    await expect(resultErrorsLocator).toBeHidden();
  }

  await expect(lendingBasedOnPropertyLocator).toContainText(
    lendingBasedOnPropertyValue.toString()
  );

  await expect(resultantLTVLocator).toContainText(resultantLTV.toString());

  await expect(lendingBasedOnAffordabilityLocator).toContainText(
    lendingBasedOnAffordabilityValue.toString()
  );
}
