describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display splash screen', () => {
    cy.contains('جمعية').should('be.visible');
    cy.contains('ادخر معاً').should('be.visible');
  });

  it('should navigate to login screen', () => {
    // Wait for splash to finish
    cy.wait(3000);
    cy.contains('تسجيل الدخول').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.wait(3000);
    cy.get('input[type="tel"]').type('550123456');
    cy.get('input[type="password"]').type('Ahmed123!');
    cy.get('button[type="submit"]').click();
    
    // Should redirect to dashboard
    cy.contains('مرحباً').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.wait(3000);
    cy.get('input[type="tel"]').type('000000000');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.contains('رقم الهاتف أو كلمة المرور غير صحيحة').should('be.visible');
  });

  it('should navigate to register screen', () => {
    cy.wait(3000);
    cy.contains('سجل الآن').click();
    cy.contains('إنشاء حساب').should('be.visible');
  });
});

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(3000);
    cy.contains('سجل الآن').click();
  });

  it('should complete registration flow', () => {
    // Step 1: Phone and email
    cy.get('input[type="tel"]').type('550999999');
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.contains('التالي').click();

    // Step 2: Password
    cy.get('input[type="password"]').first().type('NewPass123!');
    cy.get('input[type="password"]').last().type('NewPass123!');
    cy.contains('التالي').click();

    // Step 3: Name and income
    cy.get('input[type="text"]').type('مستخدم جديد');
    cy.get('input[type="checkbox"]').check();
    cy.contains('إنشاء الحساب').click();

    // OTP screen
    cy.contains('التحقق من الهاتف').should('be.visible');
  });
});
