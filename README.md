# Acre Test Takehome

Takehome assignment for Acre test role.

## Assumptions and Comments

I have used the Playwright library for its ease of end-to-end testing, and wrote the tests specifically for the HSBC affordability calculator.

I have written table-driven tests as directed by the assignment. However I would have otherwise written individual tests.

The input data is provided in the `inputData.ts` file. I believe this would suffice for a takehome assignment as I have interpreted the purpose of the assignment to focus more on the data's types and range rather than the way it is setup, however in a real-world scenario I would obtain the data from a database.

I have separated concerns by putting constants, types, and util helper functions in their respective files and importing them where necessary.

I have written comments throughout the project to provide insight into my thought process, however in a real-world scenario I would remove the comments.

I have used the Prettier VSCode extension for formatting.

## Build and Run

To run this on your local machine, follow these instructions:

- Git clone the project onto your machine.

- Type `npm install` when in the project directory.

- Type `npx playwright test affordability-test.spec.ts` to run the test.

## Further Comments
