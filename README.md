# Acre Test Takehome

Takehome assignment for Acre test role.

## Assumptions and Comments

I have used the Playwright library for its ease of end-to-end testing, and wrote the tests specifically for the HSBC affordability residential calculator.

I have written table-driven tests as directed by the assignment brief. The table-driven test style uses a collection of input data, loops through it and performs the same test for each loop iteration. To handle different scenarios, there are many if statements within the test to create different branches of execution. However I would have otherwise written individual tests, as I find it is easier to test specific cases.

The input data is provided in the `inputData.ts` file. I believe this would suffice for a takehome assignment as I have interpreted the purpose of the assignment to focus more on the data's types and range rather than the way it is setup, however in a real-world scenario I would obtain the data from a database.

The input data can take all possible input from the HSB affordability residential calculator. Types are introduced to ensure that the structure of the data is consistent.

I have separated concerns by putting constants, types, and util helper functions in their respective files and importing them where necessary.

I have created a number of helper functions to reduce improve code reuse, readability, modularity and extendability. For instance, `clickAndEnterNumericalInput` reduces the boilerplate code required to enter numerical input for the calculator. I have given descriptive and meaningful names for each.

I have separated the major aspects of the test into separate modules that handle one responsibility. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I have considered various edge cases, including cases when mortgage details aren't provided, various income details aren't provided, or when all details aren't provided.

I have written comments throughout the project to provide insight into my thought process, however in a real-world scenario I would remove the comments.

I have used the Prettier VSCode extension for formatting code.

## Challenges

The test needs to handle cases where there is a single applicant or two applicants. To handle this, the input data is structured such that the income and expenditure details contain either one applicant's data or two applicant's data. There are helper functions throughout to reduce code duplication and to promote DRY (don't repeat yourself) where necessary.

I do not know the exact workings of the calculator and the relationship between income, expenditure and mortgage details. I wasn't sure how much expenditure lead to no lending with certain values of income and mortgage property value. That being said I have attempted to write scenarios with different values for each category, such that lending is either given or not given.

## Build and Run

To run this on your local machine, follow these instructions:

- Git clone the project onto your machine.

- Type `npm install` when in the project directory.

- Type `npx playwright test affordability-test.spec.ts` to run the test.
