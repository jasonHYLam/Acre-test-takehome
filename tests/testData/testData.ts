// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
export const testData: ProvidedDetails[] = [
  // Input data for scenario where lending is given, as minimum details for lending are given.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: {
      grossIncome: 100000,
      foreignCurrency: false,
    },
  },

  // Input data for scenario where lending is given, with additional mortgage details provided.
  {
    mortgageDetails: {
      propertyValue: 1000000,
      jointMortgage: false,
      maxLTV: 0.85,
      mortgageTerm: 5,
    },
    incomeDetails: {
      grossIncome: 100000,
      foreignCurrency: false,
    },
  },

  // Input data for scenario where lending is not given, as expenditure is too great.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 10000, foreignCurrency: false },
  },

  // Input data for scenario where lending is not given, as expenditure is too great.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 100000 },
    expenditureDetails: { monthlyBTLOutgoings: 3700 },
  },

  // Input data for scenario where lending is not given, as foreignCurrency is not provided.
  {
    mortgageDetails: { propertyValue: 1000000 },
    incomeDetails: { grossIncome: 100000 },
  },

  // Input data for scenario where lending is not given, as propertyValue is 0.
  {
    mortgageDetails: { propertyValue: 0 },
    incomeDetails: { grossIncome: 0, foreignCurrency: false },
  },

  // Input data for scenario where lending is not given, as propertyValue is a negative integer.
  {
    mortgageDetails: { propertyValue: -1 },
    incomeDetails: { grossIncome: 0, foreignCurrency: false },
  },

  // Input data for scenario where lending is not given, as propertyValue is below minimum property value.
  {
    mortgageDetails: { propertyValue: 1 },
    incomeDetails: { grossIncome: 100000, foreignCurrency: false },
  },

  // Input data for scenario where no details are provided.
  {},
];

interface ProvidedDetails {
  mortgageDetails?: MortgageDetails;
  incomeDetails?: IncomeDetails;
  expenditureDetails?: ExpenditureDetails;
}

interface MortgageDetails {
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

interface IncomeDetails {
  grossIncome?: number;
  foreignCurrency?: ForeignCurrency;
}

interface ExpenditureDetails {
  monthlyBTLOutgoings?: number;
}

type MaxLTV = 0.85 | 0.9 | 0.95;

type ForeignCurrency = false | 0.1 | 0.2 | 0.3;
