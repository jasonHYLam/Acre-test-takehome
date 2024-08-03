import { ProvidedDetails, AllIncomeDetails } from "./types";

// Checks if valid mortgage details (property value) is present.
export function checkValidMortgageDetailsForLending(
  providedDetails: ProvidedDetails
) {
  if (providedDetails.mortgageDetails?.propertyValue) {
    return providedDetails.mortgageDetails.propertyValue;
  }
  return false;
}

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

// TODO: Add check for foreignCurrency
function checkValidIncomeDetailsForLendingForSoleMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails !== null
  );
}

// TODO: Add check for foreignCurrency
function checkValidIncomeDetailsForLendingForJointMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails !== null &&
    applicant2IncomeDetails &&
    applicant2IncomeDetails.grossIncome !== null &&
    applicant2IncomeDetails !== null
  );
}

// Calculates total income, handles single or double applicant scenarios.
export function calculateTotalIncome(allIncomeDetails: AllIncomeDetails) {
  let totalIncome = 0;

  if (allIncomeDetails.applicant1IncomeDetails) {
    const incomeDetails = allIncomeDetails.applicant1IncomeDetails;
    totalIncome +
      (incomeDetails.grossIncome ?? 0) +
      (incomeDetails.additionalIncome ?? 0) +
      (incomeDetails.limitedCompanyNetProfits ?? 0) +
      (incomeDetails.otherNonTaxableIncome ?? 0) +
      (incomeDetails.existingBTLRentalIncome ?? 0);
  }

  if (allIncomeDetails.applicant2IncomeDetails) {
    const incomeDetails = allIncomeDetails.applicant2IncomeDetails;
    totalIncome +
      (incomeDetails.grossIncome ?? 0) +
      (incomeDetails.additionalIncome ?? 0) +
      (incomeDetails.limitedCompanyNetProfits ?? 0) +
      (incomeDetails.otherNonTaxableIncome ?? 0) +
      (incomeDetails.existingBTLRentalIncome ?? 0);
  }

  return totalIncome;
}

// TODO: Calculate total expenditure
