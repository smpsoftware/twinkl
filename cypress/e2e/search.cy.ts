describe("Search", () => {
  beforeEach(() => {
    cy.fixture("posts").as("posts");
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
      fixture: "posts",
    });
  });

  it("search for a post", () => {
    cy.visit("/");
    cy.contains("Search").should("be.visible");

    cy.get('input[id="search"]').type("test title 2");

    cy.contains("test title 2").should("be.visible");
  });
});
