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
    await handleExpenditureDetailsForOneApplicant(
      page,
      applicant1ExpenditureDetails,
      1
    );
  }
  if (applicant2ExpenditureDetails) {
    await handleExpenditureDetailsForOneApplicant(
      page,
      applicant2ExpenditureDetails,
      2
    );
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
    // TODO: It seems this locator is erroneous. Playwright doesn't seem to be able to find this
    const monthlyBTLOutgoingsInput = page.locator(
      `#a${applicantNumber}existingBTLOutgoings`
    );
    await clickAndEnterNumericalInput(
      monthlyBTLOutgoingsInput,
      monthlyBTLOutgoings
    );
  }

  if (monthlyLoanPayments || monthlyLoanPayments === 0) {
    const monthlyLoanPaymentsInput = page.locator(
      `#a${applicantNumber}totalMonthlyLoanPayments`
    );
    await clickAndEnterNumericalInput(
      monthlyLoanPaymentsInput,
      monthlyLoanPayments
    );
  }

  if (creditCards || creditCards === 0) {
    const creditCardsInput = page.locator(
      `#a${applicantNumber}outstandingCreditCardBalances`
    );
    await clickAndEnterNumericalInput(creditCardsInput, creditCards);
  }

  if (groundRent || groundRent === 0) {
    const groundRentInput = page.locator(
      `#a${applicantNumber}rentAndServiceCharge`
    );
    await clickAndEnterNumericalInput(groundRentInput, groundRent);
  }

  if (travel || travel === 0) {
    const travelInput = page.locator(`#a${applicantNumber}travel`);
    await clickAndEnterNumericalInput(travelInput, travel);
  }

  if (childCareCosts || childCareCosts === 0) {
    const childCareCostsInput = page.locator(
      `#a${applicantNumber}childcareCosts`
    );
    await clickAndEnterNumericalInput(childCareCostsInput, childCareCosts);
  }

  if (otherExpenditure || otherExpenditure === 0) {
    const otherExpenditureInput = page.locator(
      `#a${applicantNumber}otherExpenditure`
    );
    await clickAndEnterNumericalInput(otherExpenditureInput, otherExpenditure);
  }
}
