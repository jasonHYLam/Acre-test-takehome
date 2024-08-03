import { Page } from "@playwright/test";
import { AllExpenditureDetails } from "./types";

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
