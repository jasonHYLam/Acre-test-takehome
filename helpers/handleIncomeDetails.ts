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

    // TODO: Modify this to handle the other cases; currently only handles No; may require switch statement
    //  await page.getByRole('button', { name: 'Nothing selected' }).click();
    //  await page.getByRole('menu').locator('a').filter({ hasText: 'Yes - 30% Haircut to be' }).click();
    if (foreignCurrency || foreignCurrency === false) {
      await page.getByRole("button", { name: "Nothing selected" }).click();
      await page
        .getByRole("menu")
        .locator("a")
        .filter({ hasText: "No" })
        .click();
    }

    if (additionalIncome || additionalIncome === 0) {
      const additionalIncomeInput = page.getByRole("spinbutton", {
        name: "Additional Income:",
      });
      await clickAndEnterNumericalInput(
        additionalIncomeInput,
        additionalIncome
      );
    }

    if (limitedCompanyNetProfits || limitedCompanyNetProfits === 0) {
      const limitedCompanyNetProfitsInput = page.getByRole("spinbutton", {
        name: "Limited Company Net profits:",
      });
      await clickAndEnterNumericalInput(
        limitedCompanyNetProfitsInput,
        limitedCompanyNetProfits
      );
    }
    if (otherNonTaxableIncome || otherNonTaxableIncome === 0) {
      const otherNonTaxableIncomeInput = page.getByRole("spinbutton", {
        name: "Other Non Taxable Income:",
      });
      await clickAndEnterNumericalInput(
        otherNonTaxableIncomeInput,
        otherNonTaxableIncome
      );
    }

    if (existingBTLRentalIncome || existingBTLRentalIncome === 0) {
      const existingBTLRentalIncomeInput = page.getByRole("spinbutton", {
        name: "Existing BTL Rental Income:",
      });
      await clickAndEnterNumericalInput(
        existingBTLRentalIncomeInput,
        existingBTLRentalIncome
      );
    }
  }
}
