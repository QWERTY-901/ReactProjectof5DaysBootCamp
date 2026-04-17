export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    USER_MANAGEMENT: '/users/merchants',
    TRANSACTION_REPORTS: '/reports/transactions',
    CAMUNDA_TASK: '/task',
};

export const TRANSACTION_STATUS = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    SETTLED: 'SETTLED',
};

export const ROLES = {
    PROPRIETOR: 'PROPRIETOR',
    AGENT: 'AGENT',
    ADMIN: 'ADMIN',
};