/**
 * Demo credentials for staging / UI parity. Replace with API auth in production.
 */
export const DEMO_USERS = [
    {
        username: 'ops_maker',
        password: 'TestIserveu@2026',
        role: 'ops_maker',
        displayLabel: 'OPSMISU',
    },
    {
        username: 'gourab_ops_checker',
        password: 'Q$00a2miT1SE',
        role: 'ops_checker',
        displayLabel: 'GOURAB',
    },
];

export function findDemoUser(username, password) {
    return DEMO_USERS.find(
        (u) => u.username === username && u.password === password
    );
}
