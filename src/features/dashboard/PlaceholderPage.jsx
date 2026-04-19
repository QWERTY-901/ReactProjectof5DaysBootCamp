import React from 'react';

/** Simple stand-in for routes not yet built (User Management, Audit Trail, etc.). */
const PlaceholderPage = ({ title }) => (
    <div style={wrap}>
        <h1 style={h1}>{title}</h1>
        <p style={p}>This section is coming soon.</p>
    </div>
);

const wrap = {
    padding: '32px 24px',
    maxWidth: '960px',
};

const h1 = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 12px 0',
};

const p = { color: '#718096', margin: 0 };

export default PlaceholderPage;
