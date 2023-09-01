/// <reference types="Cypress" />

describe ('Central de atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('bruna_helenareis@icloud.com')
        cy.get('#phone').type('31984097583')
        cy.get('#open-text-area').type('Gostaria de saber como faço para iniciar o curso de Cypress!')
        cy.get('button[type="submit"]').click()
        
    })
})