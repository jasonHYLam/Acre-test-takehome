// @ts-check

import { test } from "@playwright/test";
import { testData } from "./testData/testData";

import { CALCULATOR_URL, START_PAGE_URL } from "../helpers/constants";
import { handleMortgageDetails } from "../helpers/handleMortgageDetails";
import { handleIncomeDetails } from "../helpers/handleIncomeDetails";
import { handleExpenditureDetails } from "../helpers/handleExpenditureDetails";
import { checkResults } from "../helpers/checkResults";

// Table test which takes array of testEntries and performs the same test on each.

testData.forEach((testEntry) => {
  const { testName, providedDetails, expectedResult } = testEntry;
  test(testName, async ({ page }) => {
    await page.goto(CALCULATOR_URL);

    if (providedDetails) {
      if (providedDetails.mortgageDetails) {
        await handleMortgageDetails(page, providedDetails.mortgageDetails);
      }

      if (providedDetails.allIncomeDetails) {
        await handleIncomeDetails(page, providedDetails.allIncomeDetails);
      }

      if (providedDetails.allExpenditureDetails) {
        await handleExpenditureDetails(
          page,
          providedDetails.allExpenditureDetails
        );
      }
    }

    await checkResults(page, expectedResult);
  });
});
