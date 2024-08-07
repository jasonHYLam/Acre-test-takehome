import { Page } from "@playwright/test";
import { AllIncomeDetails, IncomeDetails } from "./types";
import { clickAndEnterNumericalInput } from "./utils";

// Module that handles filling in income details on the form.
// If the testEntry contains a particular valid input data, the corresponding form input is filled with that data.

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
    if (foreignCurrency === false) {
      await page.selectOption(`#a${applicantNumber}haircutPercentage`, "no");
    } else if (foreignCurrency === 0.1) {
      await page.selectOption(`#a${applicantNumber}haircutPercentage`, "10");
    } else if (foreignCurrency === 0.2) {
      await page.selectOption(`#a${applicantNumber}haircutPercentage`, "20");
    } else {
      await page.selectOption(`#a${applicantNumber}haircutPercentage`, "30");
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
