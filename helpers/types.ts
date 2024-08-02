export interface ProvidedDetails {
  mortgageDetails?: MortgageDetails;
  allIncomeDetails?: AllIncomeDetails;
  allExpenditureDetails?: AllExpenditureDetails;
}

export interface MortgageDetails {
  purchaserType?: string;
  jointMortgage?: boolean;
  maxLTV?: MaxLTV;
  applicant1Age?: number;
  applicant2Age?: number;
  applicant1EmploymentStatus?: string;
  applicant2EmploymentStatus?: string;
  martialStatus?: string;
  dependantChildren?: number;
  dependantAdults?: number;
  depositAmount?: number;
  loanAmount?: number;
  propertyValue?: number;
  mortgageTerm?: number;
  assessOnInterestOnlyBasis?: boolean;
  propertyPostcode?: string;
}

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
