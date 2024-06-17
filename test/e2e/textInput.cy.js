describe('Text Input', function () {
  beforeEach(function () {
    cy.getData();
    cy.visit('/');
  });

  it('should display the text input component', function () {
    const textInputComponents = this.data.components.filter(component => component._component === 'textinput');
    const stripHtml = cy.helpers.stripHtml;
    textInputComponents.forEach(textInputComponent => {
      cy.visit(`/#/preview/${textInputComponent._id}`);
      cy.testContainsOrNotExists('.textinput__body', stripHtml(textInputComponent.body));
      cy.testContainsOrNotExists('.textinput__title', stripHtml(textInputComponent.displayTitle));
      cy.testContainsOrNotExists('.textinput__instruction', stripHtml(textInputComponent.instruction));

      cy.get('.textinput-item__textbox').should('have.length', 1);
      if (textInputComponent._items[0].placeholder) {
        cy.get('.textinput-item__textbox').should('have.attr', 'placeholder', textInputComponent._items[0].placeholder);
      };

      // Make sure the current component is tested before moving to the next one
      // Custom cypress tests are async so we need to wait for them to pass first
      cy.wait(1000);
    });
  });
});