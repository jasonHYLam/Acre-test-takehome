import { ProvidedDetails, TestEntry } from "../../helpers/types";
// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.

// TODO: Consider average user; 30-40 years old, etc.
// TODO: Change from ProvidedDetails[] type to TestEntry[] type
// TODO: Add providedDetails object and add details to it.

export const testData: TestEntry[] = [
  {
    testName:
      "Scenario where lending is given, as minimum details (property value, gross income, foreign currency) for lending are given.",
    providedDetails: {
      mortgageDetails: { propertyValue: 1000000 },
      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: false,
        },
      },
    },
    expectedResult: {
      resultErrors: false,
      lendingBasedOnProperty: 185950,
      resultantLTV: 19,
      lendingBasedOnAffordability: 185950,
    },
  },

  {
    testName:
      "Scenario where lending is given, with additional mortgage details provided.",
    providedDetails: {
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
    expectedResult: {
      resultErrors: false,
      lendingBasedOnProperty: 185950,
      resultantLTV: 19,
      lendingBasedOnAffordability: 185950,
    },
  },

  {
    testName:
      "Scenario where lending is not given, as income is too low compared to property value.",

    providedDetails: {
      mortgageDetails: { propertyValue: 1000000 },
      allIncomeDetails: {
        applicant1IncomeDetails: { grossIncome: 10000, foreignCurrency: false },
      },
    },
    expectedResult: {
      resultErrors: false,
      lendingBasedOnProperty: "NOT AVAILABLE",
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName:
      "Scenario where lending is not given, as expenditure is too great compared to income.",

    providedDetails: {
      mortgageDetails: { propertyValue: 1000000 },
      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: false,
        },
      },
      allExpenditureDetails: {
        applicant1ExpenditureDetails: { monthlyBTLOutgoings: 3800 },
      },
    },
    expectedResult: {
      resultErrors: false,
      lendingBasedOnProperty: "NOT AVAILABLE",
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName:
      "Scenario where lending is not given, as foreignCurrency is not provided.",
    providedDetails: {
      mortgageDetails: { propertyValue: 1000000 },
      allIncomeDetails: {
        applicant1IncomeDetails: { grossIncome: 100000 },
      },
    },
    expectedResult: {
      resultErrors: true,
      lendingBasedOnProperty: 0,
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName: "Scenario where lending is not given, as propertyValue is 0.",
    providedDetails: {
      mortgageDetails: { propertyValue: 0 },
      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: false,
        },
      },
    },
    expectedResult: {
      resultErrors: true,
      lendingBasedOnProperty: 0,
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName:
      "Scenario where lending is not given, as propertyValue is a negative integer.",
    providedDetails: {
      mortgageDetails: { propertyValue: -1 },
      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: false,
        },
      },
    },
    expectedResult: {
      resultErrors: true,
      lendingBasedOnProperty: 0,
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName:
      "Scenario where lending is not given, as propertyValue is below minimum property value.",
    providedDetails: {
      mortgageDetails: { propertyValue: 1 },
      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: false,
        },
      },
    },
    expectedResult: {
      resultErrors: false,
      lendingBasedOnProperty: "NOT AVAILABLE",
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },

  {
    testName: "Scenario where no details are provided.",
    expectedResult: {
      resultErrors: true,
      lendingBasedOnProperty: "NOT AVAILABLE",
      resultantLTV: 0,
      lendingBasedOnAffordability: "NOT AVAILABLE",
    },
  },
];
