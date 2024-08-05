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
