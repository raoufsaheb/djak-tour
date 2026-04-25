# الاختبارات

هذا المجلد يحتوي على إعدادات الاختبار.

## الهيكل

```
tests/
├── setup.ts        # إعدادات عامة
└── README.md       # هذا الملف
```

## أنواع الاختبارات

### اختبارات الوحدة

موقعها: `src/**/__tests__/*.test.ts`

```bash
npm run test
```

### اختبارات التكامل

موقعها: `src/**/__tests__/*.test.tsx`

### اختبارات E2E

#### Cypress

موقعها: `cypress/e2e/*.cy.ts`

```bash
npx cypress open
```

#### Playwright

موقعها: `e2e/*.spec.ts`

```bash
npx playwright test
```

## التغطية

```bash
npm run test:coverage
```

## الأدوات

- **Vitest**: اختبارات وحدوية
- **Testing Library**: اختبار React
- **Cypress**: E2E
- **Playwright**: E2E بديل
