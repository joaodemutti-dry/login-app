describe('Login', () => {
  it('should login and redirect to dashboard', () => {

    cy.visit('/')

    cy.intercept("/login*").as("login")

    cy.wait("@login")

    cy.url().should("include","login")

    cy.get("#user").type("teste");

    cy.get("#password").type("teste");

    cy.get("button").click();

    cy.intercept("/dashboard*").as("dashboard")

    cy.wait("@dashboard")

    cy.url().should("include","dashboard")
  })
})