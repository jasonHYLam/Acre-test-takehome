import { TestEntry } from "../../helpers/types";
// Input data is an array containing objects representing calculator categories, such as mortgageDetails and incomeDetails.

import { NO_LENDING_MESSAGE } from "../../helpers/constants";
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
      lendingBasedOnPropertyValue: 185950,
      resultantLTV: 19,
      lendingBasedOnAffordabilityValue: 185950,
    },
  },

  {
    testName:
      "Scenario where lending is given, with all possible details provided.",
    providedDetails: {
      mortgageDetails: {
        purchaserType: "Buying first house - moving",
        jointMortgage: true,
        maxLTV: 0.9,
        applicant1Age: 40,
        applicant2Age: 39,
        applicant1EmploymentStatus: "Employed",
        applicant2EmploymentStatus: "Self-employed",
        maritalStatus: "Married",
        dependantChildren: 2,
        dependantAdults: 1,
        depositAmount: 20000,
        loanAmount: 10000,
        propertyValue: 1000000,
        mortgageTerm: 25,
        assessOnInterestOnlyBasis: true,
        propertyPostcode: "SW",
      },

      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: 0.1,
          additionalIncome: 10000,
          limitedCompanyNetProfits: 20000,
          otherNonTaxableIncome: 3000,
          existingBTLRentalIncome: 40000,
        },
        applicant2IncomeDetails: {
          grossIncome: 120000,
          foreignCurrency: 0.2,
          additionalIncome: 5000,
          limitedCompanyNetProfits: 40000,
          otherNonTaxableIncome: 2000,
          existingBTLRentalIncome: 20000,
        },
      },
      allExpenditureDetails: {
        applicant1ExpenditureDetails: {
          monthlyBTLOutgoings: 1000,
          monthlyLoanPayments: 400,
          creditCards: 3000,
          groundRent: 1000,
          travel: 300,
          childCareCosts: 200,
          otherExpenditure: 1000,
        },
        applicant2ExpenditureDetails: {
          monthlyBTLOutgoings: 2000,
          monthlyLoanPayments: 500,
          creditCards: 3000,
          groundRent: 1000,
          travel: 300,
          childCareCosts: 200,
          otherExpenditure: 1000,
        },
      },
    },

    expectedResult: {
      resultErrors: false,
      lendingBasedOnPropertyValue: 232950,
      resultantLTV: 23,
      lendingBasedOnAffordabilityValue: 232950,
    },
  },

  {
    testName:
      "Scenario where lending is not given for joint mortgage, as expenditure is too great.",
    providedDetails: {
      mortgageDetails: {
        purchaserType: "Buying first house - moving",
        jointMortgage: true,
        maxLTV: 0.9,
        applicant1Age: 40,
        applicant2Age: 39,
        applicant1EmploymentStatus: "Employed",
        applicant2EmploymentStatus: "Self-employed",
        maritalStatus: "Married",
        dependantChildren: 2,
        dependantAdults: 1,
        depositAmount: 20000,
        loanAmount: 10000,
        propertyValue: 1000000,
        mortgageTerm: 25,
        assessOnInterestOnlyBasis: true,
        propertyPostcode: "SW",
      },

      allIncomeDetails: {
        applicant1IncomeDetails: {
          grossIncome: 100000,
          foreignCurrency: 0.1,
          additionalIncome: 10000,
          limitedCompanyNetProfits: 20000,
          otherNonTaxableIncome: 3000,
          existingBTLRentalIncome: 40000,
        },
        applicant2IncomeDetails: {
          grossIncome: 120000,
          foreignCurrency: 0.2,
          additionalIncome: 5000,
          limitedCompanyNetProfits: 40000,
          otherNonTaxableIncome: 2000,
          existingBTLRentalIncome: 20000,
        },
      },
      allExpenditureDetails: {
        applicant1ExpenditureDetails: {
          monthlyBTLOutgoings: 10000,
          monthlyLoanPayments: 400,
          creditCards: 3000,
          groundRent: 1000,
          travel: 300,
          childCareCosts: 200,
          otherExpenditure: 1000,
        },
        applicant2ExpenditureDetails: {
          monthlyBTLOutgoings: 20000,
          monthlyLoanPayments: 500,
          creditCards: 3000,
          groundRent: 1000,
          travel: 300,
          childCareCosts: 200,
          otherExpenditure: 1000,
        },
      },
    },

    expectedResult: {
      resultErrors: false,
      lendingBasedOnPropertyValue: NO_LENDING_MESSAGE,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: 185950,
      resultantLTV: 19,
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
      lendingBasedOnPropertyValue: NO_LENDING_MESSAGE,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: NO_LENDING_MESSAGE,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
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
      lendingBasedOnPropertyValue: NO_LENDING_MESSAGE,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
    },
  },

  {
    testName: "Scenario where no details are provided.",
    providedDetails: {},
    expectedResult: {
      resultErrors: true,
      lendingBasedOnPropertyValue: 0,
      resultantLTV: 0,
      lendingBasedOnAffordabilityValue: NO_LENDING_MESSAGE,
    },
  },
];
