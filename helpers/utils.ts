import { Locator } from "@playwright/test";
import {
  ProvidedDetails,
  AllIncomeDetails,
  IncomeDetails,
  ExpenditureDetails,
  AllExpenditureDetails,
} from "./types";

// TODO: May not be needed
// Checks if valid mortgage details (property value) is present.
export function checkValidMortgageDetailsForLending(
  providedDetails: ProvidedDetails
) {
  if (providedDetails.mortgageDetails?.propertyValue) {
    return providedDetails.mortgageDetails.propertyValue;
  }
  return false;
}

// TODO: May not be needed
// Checks if valid income details (gross income and foreignCurrency) are present; handles sole and joint mortgage cases.
export function checkValidIncomeDetailsForLending(
  providedDetails: ProvidedDetails
) {
  if (providedDetails.mortgageDetails) {
    const { jointMortgage } = providedDetails.mortgageDetails;

    if (providedDetails.allIncomeDetails) {
      // The case when sole mortgage.
      if (jointMortgage === null || !jointMortgage) {
        return checkValidIncomeDetailsForLendingForSoleMortgage(
          providedDetails.allIncomeDetails
        );
      }
      // The case when joint mortgage.
      else {
        return checkValidIncomeDetailsForLendingForJointMortgage(
          providedDetails.allIncomeDetails
        );
      }
    }
    return false;
  }
  return false;
}

// TODO: May not be needed
function checkValidIncomeDetailsForLendingForSoleMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails.foreignCurrency !== null
  );
}

// TODO: May not be needed
function checkValidIncomeDetailsForLendingForJointMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails.foreignCurrency !== null &&
    applicant2IncomeDetails &&
    applicant2IncomeDetails.grossIncome !== null &&
    applicant2IncomeDetails.foreignCurrency !== null
  );
}

// TODO: May not be needed
// Calculates total income, used for checking lending. Handles single or double applicant scenarios.
export function calculateTotalIncome(allIncomeDetails: AllIncomeDetails) {
  let totalIncome = 0;

  if (allIncomeDetails.applicant1IncomeDetails) {
    const incomeDetails = allIncomeDetails.applicant1IncomeDetails;
    totalIncome + calculateIncomeForApplicant(incomeDetails);
  }

  if (allIncomeDetails.applicant2IncomeDetails) {
    const incomeDetails = allIncomeDetails.applicant2IncomeDetails;
    totalIncome + calculateIncomeForApplicant(incomeDetails);
  }

  return totalIncome;
}

// TODO: May not be needed
function calculateIncomeForApplicant(incomeDetails: IncomeDetails) {
  let totalIncomeForApplicant = 0;
  totalIncomeForApplicant +
    (incomeDetails.grossIncome ?? 0) +
    (incomeDetails.additionalIncome ?? 0) +
    (incomeDetails.limitedCompanyNetProfits ?? 0) +
    (incomeDetails.otherNonTaxableIncome ?? 0) +
    (incomeDetails.existingBTLRentalIncome ?? 0);

  return totalIncomeForApplicant;
}

// TODO: May not be needed
// Calculates total expenditure, used for checking lending. Handles single or double applicant scenarios.
export function calculateTotalExpenditure(
  allExpenditureDetails: AllExpenditureDetails
) {
  let totalExpenditure = 0;

  if (allExpenditureDetails.applicant1ExpenditureDetails) {
    const expenditure = allExpenditureDetails.applicant1ExpenditureDetails;
    totalExpenditure + calculateExpenditureForApplicant(expenditure);
  }

  if (allExpenditureDetails.applicant2ExpenditureDetails) {
    const expenditure = allExpenditureDetails.applicant2ExpenditureDetails;
    totalExpenditure + calculateExpenditureForApplicant(expenditure);
  }

  return totalExpenditure;
}

// TODO: May not be needed
function calculateExpenditureForApplicant(
  expenditureDetails: ExpenditureDetails
) {
  let totalExpenditureForApplicant = 0;
  totalExpenditureForApplicant +
    (expenditureDetails.monthlyBTLOutgoings ?? 0) +
    (expenditureDetails.monthlyLoanPayments ?? 0) +
    (expenditureDetails.creditCards ?? 0) +
    (expenditureDetails.groundRent ?? 0) +
    (expenditureDetails.travel ?? 0) +
    (expenditureDetails.childCareCosts ?? 0) +
    (expenditureDetails.otherExpenditure ?? 0);

  return totalExpenditureForApplicant;
}

// Handles clicking on an numerical input, filling in the value, and pressing enter.
export async function clickAndEnterNumericalInput(
  locator: Locator,
  value: number
) {
  await locator.click();
  await locator.fill(value.toString());
  await locator.press("Enter");
}
