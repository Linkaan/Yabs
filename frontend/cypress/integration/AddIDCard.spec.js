import baseVisit from '../helper';

context('Going to the add page', () => {
    beforeEach(() => {
        baseVisit('/admin')
    })

    it('Going to "Cards" in menu', () => {
        cy.get('[data-cy=Passerkort]').click()
        cy.url().should('include', '/admin/cards')
    })
})