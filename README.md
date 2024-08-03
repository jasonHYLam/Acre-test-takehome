# Acre Test Takehome

Takehome assignment for Acre test role.

## Assumptions and Comments

I have used the Playwright library for its ease of end-to-end testing, and wrote the tests specifically for the HSBC affordability residential calculator.

I have written table-driven tests as directed by the assignment brief. The table-driven test style uses a collection of input data, loops through it and performs the same test for each loop iteration. To handle different scenarios, there are many if statements to create different branches of execution. However I would have otherwise written individual tests.

The input data is provided in the `inputData.ts` file. I believe this would suffice for a takehome assignment as I have interpreted the purpose of the assignment to focus more on the data's types and range rather than the way it is setup, however in a real-world scenario I would obtain the data from a database.

The input data can take all possible input from the HSB affordability residential calculator. Types are introduced to ensure that the structure of the data is consistent.

I have separated concerns by putting constants, types, and util helper functions in their respective files and importing them where necessary.

I have created a number of helper functions to reduce improve code reuse, readability, modularity and extendability. For instance, `clickAndEnterNumericalInput` reduces the boilerplate code required to enter numerical input for the calculator. I have given descriptive and meaningful names for each.

I do not know the exact workings of the calculator and the relationship between income, expenditure and mortgage details. That being said I have attempted to write scenarios with different values for each category, such that lending is either given or not given.

I have separated the major aspects of the test into separate modules that handle one responsibility. These modules are `handleMortgageDetails`, `handleIncomeDetails`, `handleExpenditureDetails` and `checkResults`.

I have written comments throughout the project to provide insight into my thought process, however in a real-world scenario I would remove the comments.

I have used the Prettier VSCode extension for formatting.

## Build and Run

To run this on your local machine, follow these instructions:

- Git clone the project onto your machine.

- Type `npm install` when in the project directory.

- Type `npx playwright test affordability-test.spec.ts` to run the test.
