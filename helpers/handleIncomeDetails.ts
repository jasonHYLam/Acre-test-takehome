import { Page } from "@playwright/test";
import { AllIncomeDetails } from "./types";

export async function handleIncomeDetails(
  page: Page,
  allIncomeDetails: AllIncomeDetails
) {
  await page.getByText("2 Income").click();
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;
  if (applicant1IncomeDetails) {
    const {
      grossIncome,
      foreignCurrency,
      additionalIncome,
      limitedCompanyNetProfits,
      otherNonTaxableIncome,
      existingBTLRentalIncome,
    } = applicant1IncomeDetails;
    if (grossIncome || grossIncome === 0) {
      await page.getByRole("spinbutton", { name: "Gross Income:" }).click();
      await page
        .getByRole("spinbutton", { name: "Gross Income:" })
        .fill(grossIncome.toString());
      await page
        .getByRole("spinbutton", { name: "Gross Income:" })
        .press("Enter");
    }

    if (foreignCurrency || foreignCurrency === false) {
      await page.getByRole("button", { name: "Nothing selected" }).click();
      await page
        .getByRole("menu")
        .locator("a")
        // TODO: Modify this to handle the other cases
        .filter({ hasText: "No" })
        .click();
    }
  }
}
