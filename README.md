# Acre Test Takehome

Takehome assignment for Acre test role.

## Assumptions and Comments

I have used the Playwright library for its ease of end-to-end testing, and wrote the tests specifically for the HSBC affordability residential calculator.

I have written a table-driven test that handles multiple scenarios as directed by the assignment brief. The table-driven test approach uses a collection of test entries and loops through it to perform the same test for each loop iteration. These test entries contain input data, expected results and test names. To handle different scenarios, there are many if statements within the test to create different branches of execution.

I have used the Page Object model to perform actions on various parts of the page such as clicking buttons and filling inputs, and obtaining values from the page (using locators) to compare to the expected results for assertions.

I have introduced a number of conditional statements in the table test to handle different inputs and thus create the results for different scenarios. These scenarios include:

- When minimum details are provided for lending and and the values are great enough for lending => lending
- When the minimum details for lending are provided but the values are too low for lending => no lending
- When minimum details are provided for lending, but the property value is too low => no lending
- When minimum details are provided for lending, but income is too low compared to property value => no lending
- When minimum details are provided for lending, but expenditure is too high compared to income => no lending
- When no details are provided => no lending with results error

The test then compares the actual results with the expected results provided, using the `expect` function.

The input data is provided in the `inputData.ts` file. I believe this would suffice for a takehome assignment as I have interpreted the purpose of the assignment to focus more on the data's types and range rather than the way it is setup, however in a real-world scenario I might obtain the data from a database especially when performing read/write database operations.

The input data can take all possible input from the HSBC affordability residential calculator form. Types are introduced to ensure that the structure of the data is consistent. Additionally, the use of union types ensure that certain input is restricted to expected values, which is useful for select input types such as Marital Status, Maximum LTV etc.

I have observed that several of the inputs do not seem to affect the lending calculation, such as postcode and marital status. I have nonetheless included them in the allowed range of input as well as handling input actions. I could have tested these inputs by checking the "Printer Friendly Version" and verifying that the those values are present, but I assumed the test only needed to focus on whether lending would be given or not.

I have separated concerns by putting constants, types, and util helper functions in their respective files and importing them where necessary.

As the test file grew, I split up the test file into separate modules with single responsibilities to make the test file easier to read. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I have created a number of helper functions to reduce improve code reuse, readability, modularity and extendability. For instance, `clickAndEnterNumericalInput` reduces the boilerplate code required to enter numerical input for the calculator. I later found out that this may not be necessary, but have kept it to show how I reduce boilerplate code. I have given descriptive and meaningful names for each.

I have separated the major aspects of the test into separate modules that handle one responsibility. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I have considered various edge cases, including cases when mortgage details aren't provided, various income details aren't provided, or when all details aren't provided.

I have written comments throughout the project to provide insight into my thought process, however in a real-world scenario I would remove the comments.

I have used the Prettier VSCode extension for formatting code.

## Challenges

The test needs to handle cases where there is a single applicant or two applicants. To handle this, the input data is structured such that the income and expenditure details contain either one applicant's data or two applicant's data. There are helper functions throughout to reduce code duplication and to promote DRY (don't repeat yourself) where necessary.

I do not know the exact workings of the calculator and the relationship between income, expenditure and mortgage details. I wasn't sure how much expenditure leads to no lending with certain values of income and mortgage property value. That being said I attempted to model these relationships with simple ratios, such as `maximum expenditure to income ratio for lending`. I have attempted to write scenarios with different values for each category, such that lending is either given or not given.

There were many edge cases due to the complex relationship between income, expenditure and properties. For instance, when expenditure is extremely low (£1) and income is at the minimum required for lending (£10000), that results in no lending despite being far lower than the `maximum expenditure to income ratio for lending`.

## Build and Run

To run this on your local machine, follow these instructions:

- Git clone the project onto your machine.

- Type `npm install` when in the project directory.

- Type `npx playwright test affordability-test.spec.ts` to run the test.
