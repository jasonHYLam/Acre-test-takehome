export interface ProvidedDetails {
  testName: string;
  mortgageDetails?: MortgageDetails;
  allIncomeDetails?: AllIncomeDetails;
  allExpenditureDetails?: AllExpenditureDetails;
  expectedResult: ExpectedResult;
}

export interface MortgageDetails {
  purchaserType?: PurchaserType;
  jointMortgage?: boolean;
  maxLTV?: MaxLTV;
  applicant1Age?: number;
  applicant2Age?: number;
  applicant1EmploymentStatus?: EmploymentStatus;
  applicant2EmploymentStatus?: EmploymentStatus;
  maritalStatus?: MaritalStatus;
  dependantChildren?: number;
  dependantAdults?: number;
  depositAmount?: number;
  loanAmount?: number;
  propertyValue?: number;
  mortgageTerm?: number;
  assessOnInterestOnlyBasis?: boolean;
  propertyPostcode?: string;
}

type PurchaserType =
  | "Buying first house"
  | "Buying first house - moving"
  | "Moving to HSBC";

type EmploymentStatus =
  | "Unknown"
  | "Employed"
  | "Self-employed"
  | "Homemaker"
  | "Receiving Pension"
  | "Student"
  | "Key/Part Time"
  | "Unemployed";

type MaritalStatus =
  | "Unknown"
  | "Single"
  | "Living Together"
  | "Married"
  | "Divorced"
  | "Widowed"
  | "Separated";

export interface AllIncomeDetails {
  applicant1IncomeDetails?: IncomeDetails;
  applicant2IncomeDetails?: IncomeDetails;
}

export interface IncomeDetails {
  grossIncome?: number;
  foreignCurrency?: ForeignCurrency;
  additionalIncome?: number;
  limitedCompanyNetProfits?: number;
  otherNonTaxableIncome?: number;
  existingBTLRentalIncome?: number;
}

export interface AllExpenditureDetails {
  applicant1ExpenditureDetails?: ExpenditureDetails;
  applicant2ExpenditureDetails?: ExpenditureDetails;
}

export interface ExpenditureDetails {
  monthlyBTLOutgoings?: number;
  monthlyLoanPayments?: number;
  creditCards?: number;
  groundRent?: number;
  travel?: number;
  childCareCosts?: number;
  otherExpenditure?: number;
}

type MaxLTV = 0.85 | 0.9 | 0.95;

type ForeignCurrency = false | 0.1 | 0.2 | 0.3;

export interface ExpectedResult {
  resultErrors: boolean;
  lendingBasedOnProperty: string;
  resultantLTV: string;
  lendingBasedOnAffordability: string;
}
