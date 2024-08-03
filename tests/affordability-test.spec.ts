// @ts-check

import { test } from "@playwright/test";
import { testData } from "./testData/testData";

import { CALCULATOR_URL } from "../helpers/constants";
import { handleMortgageDetails } from "../helpers/handleMortgageDetails";
import { handleIncomeDetails } from "../helpers/handleIncomeDetails";
import { handleExpenditureDetails } from "../helpers/handleExpenditureDetails";
import { checkResults } from "../helpers/checkResults";

// Table test which takes array of input and applies the same test to each.
// Input data is an object containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
testData.forEach((input, index) => {
  // TODO: Add descriptive names to input data
  // TODO: Split up sections into separate modules
  const testTitle = `Test ${index + 1}`;
  test(testTitle, async ({ page }) => {
    await page.goto(CALCULATOR_URL);
    if (input.mortgageDetails) {
      await handleMortgageDetails(page, input.mortgageDetails);
    }

    if (input.allIncomeDetails) {
      await handleIncomeDetails(page, input.allIncomeDetails);
    }

    if (input.allExpenditureDetails) {
      await handleExpenditureDetails(page, input.allExpenditureDetails);
    }

    await checkResults(page, input);
  });
});
