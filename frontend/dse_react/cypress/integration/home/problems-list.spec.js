describe("Problems List", () => {
    beforeEach(() => {
        cy.setCookie('legalAge', 'true')
        cy.visit('/')
    })
    
    // it("header contains problems heading with a message that there are no problems", () => {
    //     cy.get('.Problems-header').should('contain', 'Problems List')
    //     cy.get('p').should('contain', 'There are no problems to list.')
    // })

    it("contains an add problem button that when clicked opens a form", () => {
        const addproblemButton = cy.get('#add-problem')
        addproblemButton.click()

        expect(cy.get('#problem-form')).toExist()
    })

    it("contains a form with fields 'Problem Name' and 'Problem Instructions' after clicking the 'Add Problem' button", () => {
        const addProblemButton = cy.get('#add-problem')
        addProblemButton.click()

        expect(cy.get('input[name="newProblemName"]')).toExist()
        expect(cy.get('textarea[name="newProblemInstructions"]')).toExist()
    });

    it("displays a problem name under the 'My Problems' heading after it has been added through the 'Add Problem' form", () => {
        const addProblemButton = cy.get('#add-problem')
        addProblemButton.click().then(() => {
            cy.get('input[name="newProblemName"]').type("Fighting at home")
            cy.get('textarea[name="newProblemInstructions"]').type("My wife is annoying")
            cy.get('input[type="submit"]').click()
            cy.get('ul').then(() => {
                cy.get('ul').contains("Fighting at home")
            })
        })
    })



})