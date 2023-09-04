Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Bruna')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('bruna_helenareis@icloud.com')
    cy.get('#phone').type('31984097583')
    cy.get('#open-text-area').type('Gostaria de mais informações sobre o curso.')
    cy.contains('button', 'Enviar').click()  
})