### Breaking down the work into smaller chunks

I see this as two distinct pieces of work. An API service and a table component.

I would break this task down into the following subtasks.

1. Create an API service with a GET request including a schema for the response.
2. Create a table to display the result of the request in the desired format.
3. Implement search functionality on the table.
4. Create a DELETE request within the API service.
5. Create a DELETE button for each element within the table.
6. Implement an E2E test for each user journey.
7. Update README.md with appropriate documentation.

Each step would have specific requirements including test coverage.

Some of these pieces of work could run in parallel if multiple developers were involved.

If an API schema for the GET request was designed and agreed before starting the work, tasks 1 and 2 could happen in parallel with mock data being used initially and the API service introduced upon completion.

### Considerations

There are a few considerations I would expect to happen before starting on this piece of work. These include,

1. Deciding on what packages to use. (I have chosen Axios for the API service)
2. Clarifying any unknowns (for example, does the search functionality need to hook up to the API? In this example, I would expect that it wouldn't and a simple table search function would be suitable and much more performant / cost effective)
3. What should the component look like? Are there designs?

### Notes

.env file would be included in the .gitignore
styling would likely be done as part of each ticket but I have opted to build the functionality before focusing on styling due to time constraints
