/// <reference types="Cypress" />

describe ('Central de atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha campos e envie o formulário', function(){
        const text = 'Bom dia, meu nome é Bruna e gostaria de saber como faço para iniciar o curso de Cypress? Valores? Horários? Etc.Desde já agradeço a atenção!'
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('bruna_helenareis@icloud.com')
        cy.get('#phone').type('31984097583')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao enviar formulário com email inválido', function(){
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('bruna_helenareis.icloud.com')
        cy.get('#phone').type('31984097583')
        cy.get('#open-text-area').type('Teste email inválido')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio após preencher com valor inválido', function(){
        cy.get('#phone').type('abcdefg').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('bruna_helenareis@icloud.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste telefone obrigatório.')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Bruna').should('have.value','Bruna').clear().should('have.value','')
        cy.get('#lastName').type('Reis').should('have.value','Reis').clear().should('have.value','')
        cy.get('#email').type('bruna_helenareis.icloud.com').should('have.value','bruna_helenareis.icloud.com').clear().should('have.value','')
        cy.get('#phone').type('31984097583').should('have.value','31984097583').clear().should('have.value','')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.eql('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.eql('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture("example").as('ArquivoExemplo')
        cy.get('input[type="file"]').selectFile('@ArquivoExemplo')
        .should(function($input){
            expect($input[0].files[0].name).to.eql('example')
        })
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})