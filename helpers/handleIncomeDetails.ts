import { Page } from "@playwright/test";
import { AllIncomeDetails, IncomeDetails } from "./types";
import { clickAndEnterNumericalInput } from "./utils";

export async function handleIncomeDetails(
  page: Page,
  allIncomeDetails: AllIncomeDetails
) {
  await page.getByText("2 Income").click();
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;
  if (applicant1IncomeDetails) {
    await handleIncomeDetailsForOneApplicant(page, applicant1IncomeDetails, 1);
  }
  if (applicant2IncomeDetails) {
    await handleIncomeDetailsForOneApplicant(page, applicant2IncomeDetails, 2);
  }
}

async function handleIncomeDetailsForOneApplicant(
  page: Page,
  incomeDetails: IncomeDetails,
  applicantNumber: number
) {
  const {
    grossIncome,
    foreignCurrency,
    additionalIncome,
    limitedCompanyNetProfits,
    otherNonTaxableIncome,
    existingBTLRentalIncome,
  } = incomeDetails;
  if (grossIncome || grossIncome === 0) {
    const grossIncomeInput = page.locator(`#a${applicantNumber}grossIncome`);
    await clickAndEnterNumericalInput(grossIncomeInput, grossIncome);
  }

  if (foreignCurrency || foreignCurrency === false) {
    await page.getByRole("button", { name: "Nothing selected" }).click();
    if (foreignCurrency === false) {
      await page
        .getByRole("menu")
        .locator("a")
        .filter({ hasText: "No" })
        .click();
    } else if (foreignCurrency === 0.1) {
      await page
        .getByRole("button", { name: "Yes - 10% Haircut to be" })
        .click();
    } else if (foreignCurrency === 0.2) {
      await page
        .getByRole("button", { name: "Yes - 20% Haircut to be" })
        .click();
    } else {
      await page
        .getByRole("button", { name: "Yes - 30% Haircut to be" })
        .click();
    }
  }

  if (additionalIncome || additionalIncome === 0) {
    const additionalIncomeInput = page.locator(
      `#a${applicantNumber}additionalIncome`
    );
    await clickAndEnterNumericalInput(additionalIncomeInput, additionalIncome);
  }

  if (limitedCompanyNetProfits || limitedCompanyNetProfits === 0) {
    const limitedCompanyNetProfitsInput = page.locator(
      `#a${applicantNumber}dividendIncome`
    );
    await clickAndEnterNumericalInput(
      limitedCompanyNetProfitsInput,
      limitedCompanyNetProfits
    );
  }

  if (otherNonTaxableIncome || otherNonTaxableIncome === 0) {
    const otherNonTaxableIncomeInput = page.locator(
      `#a${applicantNumber}otherNonTaxableIncome`
    );
    await clickAndEnterNumericalInput(
      otherNonTaxableIncomeInput,
      otherNonTaxableIncome
    );
  }

  if (existingBTLRentalIncome || existingBTLRentalIncome === 0) {
    const existingBTLRentalIncomeInput = page.locator(
      `#a${applicantNumber}existingBTLRentalIncome`
    );
    await clickAndEnterNumericalInput(
      existingBTLRentalIncomeInput,
      existingBTLRentalIncome
    );
  }
}
