import { ProvidedDetails } from "../../helpers/types";
// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.
export const testData: ProvidedDetails[] = [
  // Input data for scenario where lending is given, as minimum details for lending are given.
  {
    mortgageDetails: { propertyValue: 1000000 },
    allIncomeDetails: {
      applicant1IncomeDetails: {
        grossIncome: 100000,
        foreignCurrency: false,
      },
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
    allIncomeDetails: {
      applicant1IncomeDetails: {
        grossIncome: 100000,
        foreignCurrency: false,
      },
    },
  },

  // Input data for scenario where lending is not given, as expenditure is too great.
  {
    mortgageDetails: { propertyValue: 1000000 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 10000, foreignCurrency: false },
    },
  },

  // Input data for scenario where lending is not given, as expenditure is too great.
  {
    mortgageDetails: { propertyValue: 1000000 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 100000 },
    },
    allExpenditureDetails: {
      applicant1ExpenditureDetails: { monthlyBTLOutgoings: 3700 },
    },
  },

  // Input data for scenario where lending is not given, as foreignCurrency is not provided.
  {
    mortgageDetails: { propertyValue: 1000000 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 100000 },
    },
  },

  // Input data for scenario where lending is not given, as propertyValue is 0.
  {
    mortgageDetails: { propertyValue: 0 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 0, foreignCurrency: false },
    },
  },

  // Input data for scenario where lending is not given, as propertyValue is a negative integer.
  {
    mortgageDetails: { propertyValue: -1 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 0, foreignCurrency: false },
    },
  },

  // Input data for scenario where lending is not given, as propertyValue is below minimum property value.
  {
    mortgageDetails: { propertyValue: 1 },
    allIncomeDetails: {
      applicant1IncomeDetails: { grossIncome: 100000, foreignCurrency: false },
    },
  },

  // Input data for scenario where no details are provided.
  {},
];
