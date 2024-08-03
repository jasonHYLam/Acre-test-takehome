import { Page } from "@playwright/test";
import { AllExpenditureDetails, ExpenditureDetails } from "./types";
import { clickAndEnterNumericalInput } from "./utils";

export async function handleExpenditureDetails(
  page: Page,
  allExpenditureDetails: AllExpenditureDetails
) {
  await page.getByText("3 Expenditure").click();

  const { applicant1ExpenditureDetails, applicant2ExpenditureDetails } =
    allExpenditureDetails;

  if (applicant1ExpenditureDetails) {
    if (
      applicant1ExpenditureDetails.monthlyBTLOutgoings ||
      applicant1ExpenditureDetails.monthlyBTLOutgoings === 0
    ) {
      await page
        .getByRole("spinbutton", { name: "Existing Monthly BTL" })
        .click();
      await page
        .getByRole("spinbutton", { name: "Existing Monthly BTL" })
        .fill(applicant1ExpenditureDetails.monthlyBTLOutgoings.toString());
      await page
        .getByRole("spinbutton", { name: "Existing Monthly BTL" })
        .press("Enter");
    }
  }
}

async function handleExpenditureDetailsForOneApplicant(
  page: Page,
  expenditureDetails: ExpenditureDetails,
  applicantNumber: number
) {
  const {
    monthlyBTLOutgoings,
    monthlyLoanPayments,
    creditCards,
    groundRent,
    travel,
    childCareCosts,
    otherExpenditure,
  } = expenditureDetails;

  if (monthlyBTLOutgoings || monthlyBTLOutgoings === 0) {
    const monthlyBTLOutgoingsInput = page.locator(
      `a${applicantNumber}existingBTLOutgoings`
    );
    clickAndEnterNumericalInput(monthlyBTLOutgoingsInput, monthlyBTLOutgoings);
  }

  if (monthlyLoanPayments || monthlyLoanPayments === 0) {
    const monthlyLoanPaymentsInput = page.locator(
      `a${applicantNumber}totalMonthlyLoanPayments`
    );
    clickAndEnterNumericalInput(monthlyLoanPaymentsInput, monthlyLoanPayments);
  }

  if (creditCards || creditCards === 0) {
    const creditCardsInput = page.locator(
      `a${applicantNumber}outstandingCreditCardBalances`
    );
    clickAndEnterNumericalInput(creditCardsInput, creditCards);
  }

  if (groundRent || groundRent === 0) {
    const groundRentInput = page.locator(
      `a${applicantNumber}rentAndServiceCharge`
    );
    clickAndEnterNumericalInput(groundRentInput, groundRent);
  }

  if (travel || travel === 0) {
    const travelInput = page.locator(`a${applicantNumber}travel`);
    clickAndEnterNumericalInput(travelInput, travel);
  }

  if (childCareCosts || childCareCosts === 0) {
    const childCareCostsInput = page.locator(
      `a${applicantNumber}childcareCosts`
    );
    clickAndEnterNumericalInput(childCareCostsInput, childCareCosts);
  }

  if (otherExpenditure || otherExpenditure === 0) {
    const otherExpenditureInput = page.locator(
      `a${applicantNumber}otherExpenditure`
    );
    clickAndEnterNumericalInput(otherExpenditureInput, otherExpenditure);
  }
}
