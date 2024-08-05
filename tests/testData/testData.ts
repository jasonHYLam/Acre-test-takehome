import { TestEntry } from "../../helpers/types";
// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.

// TODO: Consider average user; 30-40 years old, etc.

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
      lendingBasedOnPropertyError: "",
      lendingBasedOnPropertyValue: 185950,
      resultantLTV: 19,
      lendingBasedOnAffordabilityError: "",
      lendingBasedOnAffordabilityValue: 185950,
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
      lendingBasedOnPropertyError: "",
      lendingBasedOnPropertyValue: 185950,
      resultantLTV: 19,
      lendingBasedOnAffordabilityError: "",
      lendingBasedOnAffordabilityValue: 185950,
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
      lendingBasedOnPropertyError: "NOT AVAILABLE",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
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
      lendingBasedOnPropertyError: "NOT AVAILABLE",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
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
      lendingBasedOnPropertyError: "",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
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
      lendingBasedOnPropertyError: "",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
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
      lendingBasedOnPropertyError: "",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
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
      lendingBasedOnPropertyError: "NOT AVAILABLE",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
    },
  },

  {
    testName: "Scenario where no details are provided.",
    providedDetails: {},
    expectedResult: {
      resultErrors: true,
      lendingBasedOnPropertyError: "NOT AVAILABLE",
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityError: "NOT AVAILABLE",
      lendingBasedOnAffordabilityValue: 0,
    },
  },
];
