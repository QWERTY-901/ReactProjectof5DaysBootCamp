import React from 'react';

const DashboardHome = () => {
    return (
        <div style={centerWrap}>
            <h1 style={heading}>Welcome to NSDL</h1>
            <p style={sub}>Banking made easy - Just in a jiffy</p>
        </div>
    );
};

const centerWrap = {
    minHeight: 'calc(100vh - 56px - 48px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    textAlign: 'center',
};

const heading = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 700,
    color: '#000000',
    margin: '0 0 16px 0',
};

const sub = {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: 400,
    color: '#000000',
    margin: 0,
};

export default DashboardHome;
