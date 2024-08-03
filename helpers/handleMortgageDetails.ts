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
  if (jointMortgage || jointMortgage === false) {
    if (jointMortgage) {
      await page.selectOption("isJointMortgage", "1");
    } else {
      await page.selectOption("isJointMortgage", "0");
    }
  }

  if (maxLTV) {
    if (maxLTV === 0.85) {
      await page.selectOption("maximumLTV", "85");
    } else if (maxLTV === 0.9) {
      await page.selectOption("maximumLTV", "90");
    } else {
      await page.selectOption("maximumLTV", "95");
    }
  }

  if (applicant1Age) {
    if (applicant1Age >= 18 || applicant1Age <= 99) {
      await page.selectOption("a1applicantsAge", applicant1Age.toString());
    }
  }

  if (applicant2Age) {
    if (applicant2Age >= 18 || applicant2Age <= 99) {
      await page.selectOption("a2applicantsAge", applicant2Age.toString());
    }
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
