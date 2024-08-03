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
    if (purchaserType === "Buying first house") {
      await page.selectOption("#purchaserType", "F");
    } else if (purchaserType === "Buying first house - moving") {
      await page.selectOption("#purchaserType", "M");
    } else if (purchaserType === "Moving to HSBC") {
      await page.selectOption("#purchaserType", "T");
    }
  }
  if (jointMortgage) {
    await page.getByText("Joint Mortgage:").press("Enter");

    // TODO:
  }
  if (maxLTV) {
    await page.getByText("Maximum LTV:").press("Enter");
    // TODO:
  }
  if (applicant1Age) {
    await page.getByText("Applicant 1's Age:").press("Enter");
  }
  if (applicant2Age) {
  }
  if (applicant1EmploymentStatus) {
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
