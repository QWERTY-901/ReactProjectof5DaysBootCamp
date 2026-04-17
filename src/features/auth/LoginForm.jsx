import React, { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router';
import { loginAction } from '../../actions/auth';

// Helper component for the button (this is fine outside)
const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} style={btnStyle}>
            {pending ? "Authenticating Securely..." : "Login to Portal"}
        </button>
    );
};

const LoginForm = () => {
    // CORRECT: Hooks must be inside the component body
    const [state, formAction] = useActionState(loginAction, null);
    const navigate = useNavigate();

    // Handle the redirection after state changes to "success"
    useEffect(() => {
        if (state?.success) {
            navigate('/dashboard');
        }
    }, [state, navigate]);

    return (
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
                <label style={labelStyle}>Username</label>
                <input name="username" type="text" placeholder="e.g. ops_maker" required style={inputStyle} />
            </div>

            <div>
                <label style={labelStyle}>Password</label>
                <input name="password" type="password" placeholder="••••••••" required style={inputStyle} />
            </div>

            {state?.error && (
                <div style={{ color: '#e53e3e', fontSize: '0.85rem', background: '#fff5f5', padding: '10px', borderRadius: '4px' }}>
                    ⚠️ {state.error}
                </div>
            )}

            <SubmitButton />

            <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: '0.8rem', color: '#2b6cb0', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
        </form>
    );
};

// Styles (remain the same)
const labelStyle = { display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box' };
const btnStyle = { background: '#1a365d', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };

export default LoginForm;