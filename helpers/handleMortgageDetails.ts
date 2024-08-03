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
    martialStatus,
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
  }
  if (jointMortgage) {
  }
  if (maxLTV) {
  }
  if (applicant1Age) {
  }
  if (applicant2Age) {
  }
  if (applicant1EmploymentStatus) {
  }
  if (applicant2EmploymentStatus) {
  }
  if (martialStatus) {
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
