// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
export const testData = [
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

interface MortgageDetails {
  propertyValue?: number;
  jointMortgage?: boolean;
  maxLTV?: number;
  mortgageTerm?: number;
}

interface IncomeDetails {
  grossIncome: number;
  foreignCurrency: boolean;
}
