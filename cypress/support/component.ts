// Cypress Component Test Support

import { mount } from 'cypress/react18';
import '../../src/index.css';

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
