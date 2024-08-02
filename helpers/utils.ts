import { ProvidedDetails, AllIncomeDetails } from "./types";

export function checkValidMortgageDetailsForLending(
  providedDetails: ProvidedDetails
) {
  if (providedDetails.mortgageDetails) {
    return providedDetails.mortgageDetails !== null;
  }
  return false;
}

export function checkValidIncomeDetailsForLending(
  providedDetails: ProvidedDetails
) {
  if (providedDetails.mortgageDetails) {
    const { jointMortgage } = providedDetails.mortgageDetails;

    if (providedDetails.allIncomeDetails) {
      if (jointMortgage === null || !jointMortgage) {
        return checkValidIncomeDetailsForLendingForSoleMortgage(
          providedDetails.allIncomeDetails
        );
      } else {
        return checkValidIncomeDetailsForLendingForJointMortgage(
          providedDetails.allIncomeDetails
        );
      }
    }
    return false;
  }
  return false;
}

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

// TODO: Calculate total income

// TODO: Calculate total expenditure
