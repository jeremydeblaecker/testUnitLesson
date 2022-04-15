describe('Front test', () => {
    it('Test click on element', () => {
      cy.visit('http://localhost:3000/')
      cy.get('img',{ timeout: 50000 }).first().click()
      cy.get("button").should('contain', 'Ajouter au panier') 
    })

      it('Test add element', () => {
        cy.visit('http://localhost:3000/')
        cy.get('img',{ timeout: 50000 }).first().click()
        cy.get('button').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Enregistré dans le panier')
      })

      it('Test cart', () => {
        cy.visit('http://localhost:3000/')
        cy.get('img',{ timeout: 50000 }).first().click()
        cy.get('button').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Enregistré dans le panier')
        cy.contains('Retour').click()
        cy.contains('Aller sur panier').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Figurine de Rick Sanchez')
      })

      it('Test delete element', () => {
        cy.visit('http://localhost:3000/')
        cy.get('img',{ timeout: 50000 }).first().click()
        cy.get('button').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Enregistré dans le panier')
        cy.contains('Retour').click()
        cy.contains('Aller sur panier').click()
        cy.wait(10000)
        cy.get('button').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Produit bien supprimé')
      })

      
    it('Test add too much elements', () => {
        cy.visit('http://localhost:3000/')
        cy.get('img',{ timeout: 50000 }).first().click()
        cy.get('input').type('72')
        cy.get('button').click()
        cy.wait(10000)
        cy.get('p').first().should('contain', 'Trop de quantité')
      })

})