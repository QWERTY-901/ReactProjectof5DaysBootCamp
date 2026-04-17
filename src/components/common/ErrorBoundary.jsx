import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Banking Portal Critical Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={errorContainer}>
                    <div style={errorCard}>
                        <h2 style={{ color: '#e53e3e' }}>System Unavailable</h2>
                        <p>We encountered a technical issue connecting to NSDL servers.</p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            style={retryBtn}
                        >
                            Return to Login
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const errorContainer = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafc' };
const errorCard = { padding: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' };
const retryBtn = { marginTop: '20px', padding: '10px 20px', background: '#1a365d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default ErrorBoundary;