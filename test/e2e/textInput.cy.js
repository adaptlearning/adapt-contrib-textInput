describe('Text Input', function () {
  beforeEach(function () {
    cy.getData()
    cy.visit('/');
  });

  it('should display the text input component', function () {
    const textInputComponents = this.data.components.filter((component) => component._component === 'textinput')
    textInputComponents.forEach((textInputComponent) => {
      cy.visit(`/#/preview/${textInputComponent._id}`);
      cy.stripHtml(textInputComponent.body)
      const bodyWithoutHtml = this.text;
      cy.testContainsOrNotExists('.textinput__body', bodyWithoutHtml)
      
      cy.testQuestionButtons()
      cy.testContainsOrNotExists('.textinput__title', textInputComponent.displayTitle)
      cy.testContainsOrNotExists('.textinput__instruction', textInputComponent.instruction)
      cy.get('.textinput-item__textbox').should('have.length', 1)
      if (textInputComponent._items[0].placeholder) {
        cy.get('.textinput-item__textbox').should('have.attr', 'placeholder', textInputComponent._items[0].placeholder)
      }
      
      // Make sure the current component is tested before moving to the next one
      // Custom cypress tests are async so we need to wait for them to pass first
      cy.wait(1000)
    });
  });
});