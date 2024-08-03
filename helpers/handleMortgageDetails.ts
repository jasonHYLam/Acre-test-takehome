import { Page } from "@playwright/test";
import { MortgageDetails } from "./types";
import { clickAndEnterNumericalInput } from "./utils";

export async function handleMortgageDetails(
  page: Page,
  mortgageDetails: MortgageDetails
) {
  await page.getByText("1 Mortgage Details").click();

  const {
    purchaserType,
    jointMortgage,
    maxLTV,
    applicant1Age,
    applicant2Age,
    applicant1EmploymentStatus,
    applicant2EmploymentStatus,
    maritalStatus,
    dependantChildren,
    dependantAdults,
    depositAmount,
    loanAmount,
    propertyValue,
    mortgageTerm,
    assessOnInterestOnlyBasis,
    propertyPostcode,
  } = mortgageDetails;

  if (purchaserType) {
    await page.getByRole("button", { name: "Buying first house" }).click();
    // TODO:
  }
  if (jointMortgage) {
    await page.getByRole("button", { name: "Sole" }).click();
    // TODO:
  }
  if (maxLTV) {
    await page
      .getByRole("button", { name: "Less than or equal 85% (LTI 4" })
      .click();

    // TODO:
  }
  if (applicant1Age) {
    await page.getByRole("button", { name: "18" }).first().click();
  }
  if (applicant2Age) {
  }
  if (applicant1EmploymentStatus) {
    await page.getByRole("button", { name: "Unknown" }).first().click();
  }
  if (applicant2EmploymentStatus) {
  }
  if (maritalStatus) {
  }
  if (dependantChildren) {
  }
  if (dependantAdults) {
  }
  if (depositAmount) {
    const depositAmountInput = page.getByLabel("Deposit Amount:");
    await clickAndEnterNumericalInput(depositAmountInput, depositAmount);
  }
  if (loanAmount) {
    const loanAmountInput = page.getByLabel("Loan Amount:");
    await clickAndEnterNumericalInput(loanAmountInput, loanAmount);
  }

  if (propertyValue || propertyValue === 0) {
    const propertyValueInput = page.getByLabel("Property Value:");
    await clickAndEnterNumericalInput(propertyValueInput, propertyValue);
  }

  if (mortgageTerm) {
  }
  if (assessOnInterestOnlyBasis) {
  }
  if (propertyPostcode) {
  }
}
