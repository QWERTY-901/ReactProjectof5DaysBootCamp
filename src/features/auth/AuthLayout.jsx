import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={logoSection}>
                    <h1 style={{ color: '#1a365d', margin: 0 }}>NSDL</h1>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Payments Bank Portal</p>
                </div>
                {children}
                <div style={footerStyle}>
                    <p>© 2026 Echelon Industries | Secure Staging Environment</p>
                </div>
            </div>
        </div>
    );
};

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' };
const cardStyle = { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const logoSection = { textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #f0f2f5', paddingBottom: '20px' };
const footerStyle = { marginTop: '30px', textAlign: 'center', fontSize: '0.75rem', color: '#999' };

export default AuthLayout;