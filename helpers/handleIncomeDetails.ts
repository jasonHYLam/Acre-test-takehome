import { Page } from "@playwright/test";
import { AllIncomeDetails } from "./types";

export async function handleIncomeDetails(
  page: Page,
  allIncomeDetails: AllIncomeDetails
) {
  const { applicant1IncomeDetails, applicant2IncomeDetails } = allIncomeDetails;
  if (applicant1IncomeDetails) {
    if (
      applicant1IncomeDetails.grossIncome ||
      applicant1IncomeDetails.grossIncome === 0
    ) {
      await page.getByRole("spinbutton", { name: "Gross Income:" }).click();
      await page
        .getByRole("spinbutton", { name: "Gross Income:" })
        .fill("100000");
      await page
        .getByRole("spinbutton", { name: "Gross Income:" })
        .press("Enter");
    }

    if (
      applicant1IncomeDetails.foreignCurrency ||
      applicant1IncomeDetails.foreignCurrency === false
    ) {
      await page.getByRole("button", { name: "Nothing selected" }).click();
      await page
        .getByRole("menu")
        .locator("a")
        .filter({ hasText: "No" })
        .click();
    }
  }
}
