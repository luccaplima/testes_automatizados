describe("Calculadora deve realizar os cálculos", () => {
    const ensureMath = (value1, value2, operator, expectedResult) => {
        cy.visit("/");
        `${value1}`.split('').forEach((number) => {
            cy.get('[value="'+number+'"]').click()
        });
        cy.get('[value="'+operator+'"]').click();
        `${value2}`.split('').forEach((number) => {
            cy.get('[value="'+number+'"]').click()
        });
        cy.get('[value="="]').click();
        cy.get('#tela').contains(expectedResult);
    }

    it("Deve somar corretamente!", () => {
        ensureMath(3, 2, '+', 5)
    });

    it("Deve subtrair corretamente!", () => {
        ensureMath(3, 2, '-', 1)
    });

    it("Deve multiplicar corretamente!", () => {
        ensureMath(3, 2, 'x', 6)
    });

    it("Deve dividir corretamente!", () => {
        ensureMath(14, 2, '/', 7)
    });

    it('Ao clicar em um número ele deve aparecer na tela!', () => {
        cy.visit("/");
        cy.get('[value="2"]').click()
        cy.get('[value="3"]').click()
        cy.get('#tela').should('have.text', '23')
    });

    it('Usar um operador deve limpar a tela!', () => {
        cy.visit("/");
        cy.get('[value="2"]').click()
        cy.get('[value="+"]').click();
        cy.get('#tela').should('be.empty')
    });

    it('Não deve ser permitido usar o operador de igual sem passar valores!', () => {
        cy.visit("/");
        cy.get('[value="2"]').click();
        cy.get('[value="="]').should('be.disabled');
        cy.get('[value="+"]').click();
        cy.get('[value="="]').should('be.disabled');
        cy.get('[value="2"]').click();
        cy.get('[value="="]').should('not.be.disabled');
    });
});