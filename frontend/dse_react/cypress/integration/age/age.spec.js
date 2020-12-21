describe('Age', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("Redirects to age page when no cookie present", ()=>{
        cy.get('.ageHeader').should('contain', 'Are you over 21?')
    })
    it("When the 'yes' button is clicked, redirects to /", () => {
        cy.get('.legalAgeButton').click()
        cy.get('.ProblemsList').should('exist');
    })
}) 

