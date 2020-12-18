describe('Age', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("Redirects to age page when no cookie present", ()=>{
        cy.get('.Age-header').should('contain', 'Are you over 21?')
    })

}) 

