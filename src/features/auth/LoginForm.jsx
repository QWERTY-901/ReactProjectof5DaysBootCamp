import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { findDemoUser } from '../../config/demoUsers';

const errRed = '#c53030';
const borderDefault = '#cbd5e0';
const labelMuted = '#4a5568';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [authError, setAuthError] = useState('');
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setAuthError('');

        const userTrim = credentials.username.trim();
        const pass = credentials.password;
        const uEmpty = !userTrim;
        const pEmpty = !pass;

        setUsernameInvalid(uEmpty);
        setPasswordInvalid(pEmpty);

        if (uEmpty || pEmpty) {
            return;
        }

        const user = findDemoUser(userTrim, pass);

        if (!user) {
            setAuthError('Invalid username or password.');
            return;
        }

        localStorage.setItem('token', `demo_${user.username}_${Date.now()}`);
        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);
        localStorage.setItem('displayLabel', user.displayLabel);

        navigate('/dashboard');
    };

    return (
        <div style={formWrapper}>
            <h1 style={welcomeTitle}>Welcome Back!</h1>
            <p style={subText}>Please enter your details</p>

            <form onSubmit={handleLogin} style={formStyle} noValidate>
                {authError ? (
                    <div style={errorBanner} role="alert">
                        {authError}
                    </div>
                ) : null}

                <div style={fieldBlock}>
                    <label
                        htmlFor="login-username"
                        style={{
                            ...floatingLabel,
                            color: usernameInvalid ? errRed : labelMuted,
                        }}
                    >
                        Username*
                    </label>
                    <input
                        id="login-username"
                        type="text"
                        name="username"
                        autoComplete="username"
                        placeholder="Username"
                        value={credentials.username}
                        style={{
                            ...outlinedInput,
                            border: usernameInvalid
                                ? `1px solid ${errRed}`
                                : `1px solid ${borderDefault}`,
                        }}
                        onChange={(e) => {
                            setCredentials({ ...credentials, username: e.target.value });
                            if (usernameInvalid) setUsernameInvalid(false);
                            if (authError) setAuthError('');
                        }}
                    />
                    {usernameInvalid ? (
                        <p style={fieldErrorMsg}>*Username is required.*</p>
                    ) : null}
                </div>

                <div style={fieldBlock}>
                    <label
                        htmlFor="login-password"
                        style={{
                            ...floatingLabel,
                            color: passwordInvalid ? errRed : labelMuted,
                        }}
                    >
                        Password*
                    </label>
                    <div style={passwordWrap}>
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            value={credentials.password}
                            style={{
                                ...outlinedInput,
                                paddingRight: '44px',
                                border: passwordInvalid
                                    ? `1px solid ${errRed}`
                                    : `1px solid ${borderDefault}`,
                            }}
                            onChange={(e) => {
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                });
                                if (passwordInvalid) setPasswordInvalid(false);
                                if (authError) setAuthError('');
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={toggleBtn}
                            aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    {passwordInvalid ? (
                        <p style={fieldErrorMsg}>*Password is required.*</p>
                    ) : null}
                </div>

                <div style={optionsRow}>
                    <label style={checkboxLabel}>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a
                        href="#"
                        style={forgotLink}
                        onClick={(e) => e.preventDefault()}
                    >
                        Forgot Password?
                    </a>
                </div>

                <button type="submit" style={loginBtn}>
                    Login
                </button>
            </form>
        </div>
    );
};

const formWrapper = { textAlign: 'left', width: '100%' };

const welcomeTitle = {
    fontSize: '2.25rem',
    margin: '0 0 8px 0',
    fontWeight: 700,
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
};

const subText = {
    color: '#718096',
    marginBottom: '28px',
    fontSize: '1rem',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
};

const errorBanner = {
    background: '#fff5f5',
    color: errRed,
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    border: '1px solid #feb2b2',
};

const fieldBlock = {
    position: 'relative',
    paddingTop: '2px',
    marginBottom: '2px',
};

const floatingLabel = {
    position: 'absolute',
    left: '12px',
    top: '-9px',
    zIndex: 1,
    backgroundColor: '#ffffff',
    padding: '0 6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    pointerEvents: 'none',
};

const outlinedInput = {
    width: '100%',
    padding: '14px 12px',
    borderRadius: '4px',
    border: `1px solid ${borderDefault}`,
    fontSize: '1rem',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
};

const fieldErrorMsg = {
    color: errRed,
    fontSize: '0.8rem',
    margin: '6px 0 0 2px',
};

const passwordWrap = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
};

const toggleBtn = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#718096',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const optionsRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    marginTop: '2px',
};

const checkboxLabel = {
    color: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
};

const forgotLink = {
    color: '#4a5568',
    textDecoration: 'none',
};

const loginBtn = {
    background: '#800000',
    color: '#fff',
    padding: '14px 16px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    marginTop: '6px',
};

export default LoginForm;
