import { ProvidedDetails, AllIncomeDetails } from "./types";

export async function checkValidIncomeDetailsForLendingForSoleMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails !== null
  );
}

export async function checkValidIncomeDetailsForLendingForJointMortgage(
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;

  return (
    applicant1IncomeDetails &&
    applicant1IncomeDetails.grossIncome !== null &&
    applicant1IncomeDetails !== null
  );
}
