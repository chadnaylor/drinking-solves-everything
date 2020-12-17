describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains problems heading with a message that there are no problems", () => {
      cy.get('.App-header').should('contain', 'My Problems')
      cy.get('p').should('contain', 'There are no problems to list.')
    })

  it("contains an add problem button that when clicked opens a form", () => {
    const addproblemButton = cy.get('#add-problem')
    addproblemButton.click()

    expect(cy.get('#problem-form')).toExist()
  })
  })