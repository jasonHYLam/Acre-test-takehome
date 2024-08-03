import { Page } from "@playwright/test";
import { AllIncomeDetails } from "./types";
import { clickAndEnterNumericalInput } from "./utils";

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
      const grossIncomeInput = page.getByRole("spinbutton", {
        name: "Gross Income:",
      });
      await clickAndEnterNumericalInput(grossIncomeInput, grossIncome);
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
    //  await page.getByRole('spinbutton', { name: 'Gross Income:' }).click();
    //  await page.getByRole('spinbutton', { name: 'Additional Income:' }).click();
    //  await page.getByRole('spinbutton', { name: 'Limited Company Net profits:' }).click();
    //  await page.getByRole('spinbutton', { name: 'Other Non Taxable Income:' }).click();
    //  await page.getByRole('button', { name: 'Nothing selected' }).click();
    //  await page.getByRole('menu').locator('a').filter({ hasText: 'Yes - 30% Haircut to be' }).click();
  }
}
