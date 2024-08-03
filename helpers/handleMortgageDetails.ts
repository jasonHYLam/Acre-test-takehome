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
    if (applicant2Age >= 18 && applicant2Age <= 99) {
      await page.selectOption("a2applicantsAge", applicant2Age.toString());
    }
  }

  if (applicant1EmploymentStatus) {
    if (applicant1EmploymentStatus === "Unknown") {
      await page.selectOption("a1employmentStatus", "X");
    } else if (applicant1EmploymentStatus === "Employed") {
      await page.selectOption("a1employmentStatus", "E");
    } else if (applicant1EmploymentStatus === "Self-employed") {
      await page.selectOption("a1employmentStatus", "S");
    } else if (applicant1EmploymentStatus === "Homemaker") {
      await page.selectOption("a1employmentStatus", "H");
    } else if (applicant1EmploymentStatus === "Receiving Pension") {
      await page.selectOption("a1employmentStatus", "P");
    } else if (applicant1EmploymentStatus === "Student") {
      await page.selectOption("a1employmentStatus", "G");
    } else if (applicant1EmploymentStatus === "Key/Part Time") {
      await page.selectOption("a1employmentStatus", "K");
    } else if (applicant1EmploymentStatus === "Unemployed") {
      await page.selectOption("a1employmentStatus", "U");
    }
  }

  if (applicant2EmploymentStatus) {
    if (applicant2EmploymentStatus === "Unknown") {
      await page.selectOption("a2employmentStatus", "X");
    } else if (applicant2EmploymentStatus === "Employed") {
      await page.selectOption("a2employmentStatus", "E");
    } else if (applicant2EmploymentStatus === "Self-employed") {
      await page.selectOption("a2employmentStatus", "S");
    } else if (applicant2EmploymentStatus === "Homemaker") {
      await page.selectOption("a2employmentStatus", "H");
    } else if (applicant2EmploymentStatus === "Receiving Pension") {
      await page.selectOption("a2employmentStatus", "P");
    } else if (applicant2EmploymentStatus === "Student") {
      await page.selectOption("a2employmentStatus", "G");
    } else if (applicant2EmploymentStatus === "Key/Part Time") {
      await page.selectOption("a2employmentStatus", "K");
    } else if (applicant2EmploymentStatus === "Unemployed") {
      await page.selectOption("a2employmentStatus", "U");
    }
  }

  if (maritalStatus) {
    if (maritalStatus === "Unknown") {
      page.selectOption("a1maritalStatus", "U");
    } else if (maritalStatus === "Single") {
      page.selectOption("a1maritalStatus", "S");
    } else if (maritalStatus === "Living Together") {
      page.selectOption("a1maritalStatus", "L");
    } else if (maritalStatus === "Married") {
      page.selectOption("a1maritalStatus", "M");
    } else if (maritalStatus === "Divorced") {
      page.selectOption("a1maritalStatus", "D");
    } else if (maritalStatus === "Widowed") {
      page.selectOption("a1maritalStatus", "W");
    } else if (maritalStatus === "Separated") {
      page.selectOption("a1maritalStatus", "Z");
    }
  }
  if (dependantChildren) {
    if (dependantChildren >= 0 && dependantChildren <= 4) {
      page.selectOption("noDependantChildren", dependantChildren.toString());
    } else if (dependantChildren >= 5) {
      page.selectOption("noDependantChildren", "5+");
    }
  }

  if (dependantAdults) {
    if (dependantAdults >= 0 && dependantAdults <= 4) {
      page.selectOption("noDependantAdults", dependantAdults.toString());
    } else if (dependantAdults >= 5) {
      page.selectOption("noDependantAdults", "5+");
    }
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
    if (mortgageTerm >= 5 && mortgageTerm <= 40) {
      await page.selectOption("requiredMortgageTerm", mortgageTerm.toString());
    }
  }
  if (assessOnInterestOnlyBasis) {
  }
  if (propertyPostcode) {
  }
}
