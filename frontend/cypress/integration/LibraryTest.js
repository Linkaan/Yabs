import baseVisit from '../helper';

describe('This test checks the rendered content' , () => {
    it('checks the whole page', () => {
      baseVisit('/library/Interface');
    });

    xit('Checks scan your book barcode card' , () => {
        cy.get('[data-cy=returnCard]')
        cy.contains('Scan your book barcode')
        cy.contains('Bokens Streckkod')
        cy.contains('Return')  
    })

    xit('Checks scan the book barcode card' , () => {
        cy.get('[data-cy=libraryLoanCard]')
        cy.contains('Scan the book barcode')
        cy.contains('Bokens Streckkod')
        cy.contains('Låna Ut')    
    })
    
    xit('Checks the data tables' , () => {
        cy.get('[data-cy=table]')
        cy.contains('Search')
        cy.contains('Lånad av')
        cy.contains('Utlånad av')
        cy.contains('Boktitel')
        cy.contains('Utgångsdatum')
        cy.contains('Titel')
        cy.contains('Kostnad')
        cy.contains('Typ')
        cy.contains('ISBN')
    })
});
