# Acre Test Takehome

Takehome assignment for Acre test role.

## Overview

I have written a table-driven end-to-end test that handles multiple scenarios for usage of an affordability calculator, as directed by the assignment brief. The table-driven test approach takes a collection of test entries and loops through it to perform the same test for each loop iteration. These test entries contain input data (with type of `ProvidedDetails`), expected results (with type of `ExpectedResult`) and test names. The test is split up into different modules to handle filling the form inputs for the corresponding input data and to check the results by comparing the expected results with the actual results. To handle different scenarios when different combinations of inputs are provided, there are many conditional statements, one for each form input.

I have used the [Playwright library](https://playwright.dev/) for its ease of end-to-end testing, and wrote the tests specifically for the [HSBC affordability residential calculator](https://portal.intermediaries.hsbc.co.uk/affordabilitycalculator/affordabilitycalculatorpage.php).

I have used the Page Object model to perform actions on various parts of the page such as clicking buttons and filling inputs, and obtaining values from the page (using locators) to compare to the expected results for assertions.

I have created several scenarios based on different combinations of inputs, for both lending and no lending. These scenarios include:

### Lending:

- When income is very high compared to expenditure and high enough for the property price
- When minimum details are provided for lending and and the values are great enough for lending

### No lending:

- When the minimum details for lending are provided but the values are too low for lending
- When minimum details are provided for lending, but the property value is too low
- When minimum details are provided for lending, but income is too low compared to property value
- When minimum details are provided for lending, but expenditure is too high compared to income
- When no details are provided

The test then compares the actual results with the expected results provided, using the `expect` function and various assertion methods.

The input data is provided in the `inputData.ts` file. I believe this would suffice for a takehome assignment as I have interpreted the purpose of the assignment to focus more on the data's types and range rather than the way it is setup, however in a real-world scenario for end-to-end testing I might obtain the data from a database especially when performing read/write database operations.

The input data can take all possible input from the HSBC affordability residential calculator form. Types are introduced to ensure that the structure of the data is consistent. Additionally, the use of union types ensure that certain input is restricted to expected values, which is useful for select input types such as Marital Status, Maximum LTV etc.

## Assumptions

I have assumed that the test only needed to verify whether lending would be given or not. I have observed that several of the inputs do not seem to affect the lending calculation, such as postcode and marital status. I have nonetheless included them in the allowed range of input as well as handling input actions. If necessary, I could have tested these inputs by checking the "Printer Friendly Version" results and verifying that corresponding values are present.

I have assumed that for the purpose of this assignment, the data setup was not too important, thus I used a simple `testData` file containing the input data rather than a database.

I have assumed that this test only needs to focus on one calculator rather than multiple calculators.

The assignment mentions that the different scenarios can be easily extended. There are multiple ways this can be interpreted:

- being able to easily add to the input in order to create different scenarios. I have considered this by structuring the input data to take all valid inputs for the HSBC calculator, with valid types.
- if new inputs are added to the calculator, then being able to easily add to the test to handle these. I have considered this by adding helper functions to reduce boilerplate code, and separating different sections of the calculator form into different modules.

## Comments

To create scenarios, I interacted with the calculator with different combinations of inputs. From this, I have observed that there are approximate threshold values/ratios required for certain inputs for lending to occur. These include:

- minimum property value: 50000
- minimum income value: 10000 (if property value is 50000)
- minimum income to property ratio (estimated): 0.02
- maximum expenditure to income ratio (estimated): 0.48

I have used these thresholds to create some scenarios for the test.

I have separated concerns by putting constants, types, and util helper functions in their respective files and importing them where necessary.

As the test file grew, I split up the test file into separate modules with single responsibilities to make the test file easier to read. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I had originally created a number of helper functions to reduce improve code reuse, readability, modularity and extendability. For instance, `clickAndEnterNumericalInput` reduces the boilerplate code required to enter numerical input for the calculator. I later found out that this may not be necessary, but have kept it to show how I would approach reducing boilerplate code. I have given descriptive and meaningful names for each.

My original approach did not use `expectedResult` and thus required general expected results, such as if `lendingBasedOnAffordability` was greater than 0 or was `NOT AVAILABLE`. This required nested conditional statements which were very hard to follow. These conditional statements required a number of helper functions such as `checkValidMortgageDetailsForLending`, to help determine when these scenarios would occur. Introducing `expectedResult` to each `testEntry` meant that the test result could be compared to the `expectedResult`. This removed the need for the nested conditional statements, which drastically simplified the code.

I have separated the major aspects of the test into separate modules that handle one responsibility. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I have considered various edge cases, including cases when mortgage details aren't provided, various income details aren't provided, or when all details aren't provided.

I have written comments throughout the project to provide insight into my thought process, however in a real-world scenario I would remove the comments.

I have used the Prettier VSCode extension for formatting code.

## Challenges

I do not know the exact workings of the calculator and the relationship between income, expenditure and mortgage details. I wasn't sure how much expenditure leads to no lending with certain values of income and mortgage property value. That being said I attempted to model these relationships with simple ratios, such as `maximum expenditure to income ratio for lending`. I have attempted to write scenarios with different values for each category, such that lending is either given or not given.

There were many edge cases due to the complex relationship between income, expenditure and properties. For instance, when expenditure is extremely low (£1) and income is at the minimum required for lending (£10000), that results in no lending despite being far lower than the `maximum expenditure to income ratio for lending`.

## Build and Run

To run this on your local machine, follow these instructions:

- Git clone the project onto your machine.

- Type `npm install` when in the project directory.

- Type `npx playwright test affordability-test.spec.ts` to run the test.
