describe ("Problem container is empty",() =>{
    beforeEach(() => {
        cy.setCookie('legalAge', 'true')
        cy.visit('/')
    })
    it('Should say no problem selected when you visit the home page',()=> {
        cy.get('.ProblemDetail').should('contain', 'Select a problem to see drink recommendations!!! :P ')
       
    })
    it('Should render a problem description/link to recipe when a problem is clicked', () => {
        cy.get('.ProblemsList>ul').children().first().click()
        cy.get('.Problems-header').contains("wife")
    })
})