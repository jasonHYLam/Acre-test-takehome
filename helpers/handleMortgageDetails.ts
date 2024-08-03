import { Page } from "@playwright/test";
import { MortgageDetails } from "./types";

export async function handleMortgageDetails(
  page: Page,
  mortgageDetails: MortgageDetails
) {
  await page.getByText("1 Mortgage Details").click();
  if (mortgageDetails.propertyValue || mortgageDetails.propertyValue === 0) {
    await page.getByLabel("Property Value:").click();
    await page
      .getByLabel("Property Value:")
      .fill(mortgageDetails.propertyValue.toString());
    await page.getByLabel("Property Value:").press("Enter");
  }
}
