// feature/auth-service is merged and deployed — expense-api/investment/auth-service are live
// on their real prod ports with JWT enforcement. Flip back to true only if testing against a
// throwaway backend again.
const USE_TEST_BACKEND = false;

const PROD_HOST = 'http://darlan-ms-7e24.tail547bb5.ts.net';
const TEST_HOST = 'http://localhost';

const host = USE_TEST_BACKEND ? TEST_HOST : PROD_HOST;

export const EXPENSE_API_BASE = USE_TEST_BACKEND ? `${host}:8091` : `${host}:8081`;
export const INVESTMENT_API_BASE = USE_TEST_BACKEND ? `${host}:8092` : `${host}:8082`;
export const AUTH_API_BASE = `${host}:8083`;
