export const START_PAGE_URL = "https://intermediaries.hsbc.co.uk/calculator/";

export const CALCULATOR_URL =
  "https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php";

export const NO_LENDING_MESSAGE = "NOT AVAILABLE";

// The following values are various constants observed when experimenting with the HSBC affordability calculator for intermediaries. This may vary for different calculators.

// The minimum property value required for lending, assuming 0 expenditure.
export const MIN_PROPERTY_VALUE = 50000;

// The minimum income value required for lending, assuming 0 expenditure.
export const MIN_INCOME_VALUE = 9997;

// The ESTIMATED minimum income to property value ratio required for lending, assuming 0 expenditure.
export const MIN_INCOME_TO_PROPERTY_RATIO_FOR_LENDING = 0.02;

// The ESTIMATED maximum expenditure to income ratio required for lending.
export const MAX_EXPENDITURE_TO_INCOME_RATIO_FOR_LENDING = 0.48;
