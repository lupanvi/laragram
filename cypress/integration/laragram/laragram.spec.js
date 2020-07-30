const yourFixturePath = 'croc.jpg';

beforeEach(() => {
  cy.visit('/login')
  cy.contains('Laragram')
  cy.get('#email')
    .type('demo@gmail.com')
    .should('have.value', 'demo@gmail.com')
  cy.get('#password')
    .type('123456')
    .should('have.value', '123456')
  cy.contains('Log In')
    .click()
})

describe('Home Page', () => {
  it('Visits the login page and logs in', () => {
      cy.contains('Laravel')
  })
})

// describe('Feed Page', () => {
//   it('Add photo to feed', () => {
//     cy.contains('Laravel')
//     cy.get('input[type="file"]').invoke('show')
//       .click({force: true})
//       .attachFile(yourFixturePath)
//       .click({force: true})
//     cy.contains('Next').click()
//     cy.get('.description-container')
//       .type('hello, it is me')
//     cy.contains('Share').click()
//   })
// })

