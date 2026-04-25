// Cypress E2E Support

// Commands
Cypress.Commands.add('login', (phone: string, password: string) => {
  cy.visit('/');
  cy.get('input[type="tel"]').type(phone);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('enterOTP', (code: string) => {
  code.split('').forEach((digit, index) => {
    cy.get('input').eq(index).type(digit);
  });
});

// Global beforeEach
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Hide fetch/XHR requests from command log
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}
