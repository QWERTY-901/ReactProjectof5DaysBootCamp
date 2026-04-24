import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import nsdl_logo from '../assets/logo.png';
import { getEncryptedData, performBankLogin, getDecryptedData, dashboardapi, forgotPassword } from '../utils/authService';

const CardWrapper = ({ children }) => (
  <div style={authContainer}>
    <div style={backgroundBlur}>
      <div style={blurCircle1}></div>
      <div style={blurCircle2}></div>
    </div>

    {/* Main Content Card */}
    <div style={authCard}>
      <img src={nsdl_logo} alt="NSDL" style={logo} />
      {children}
    </div>

    {/* Footer Links */}
    <div style={footerLinks}>
      <span style={footerLink}>Terms and Conditions</span>
      <span style={footerLink}>Privacy Policy</span>
      <span style={footerLink}>CA Privacy Notice</span>
    </div>
  </div>
);

// Styles
const authContainer = {
  position: 'relative',
  height: '100vh',
  width: '100%',
  backgroundColor: '#FBFBFB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const backgroundBlur = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
};

const blurCircle1 = {
  position: 'absolute',
  left: '-160px',
  top: '0',
  width: '700px',
  height: '700px',
  background: 'radial-gradient(circle, rgba(153,27,27,0.6), transparent 70%)',
  filter: 'blur(140px)',
};

const blurCircle2 = {
  position: 'absolute',
  left: '-80px',
  top: '160px',
  width: '500px',
  height: '500px',
  background: 'radial-gradient(circle, rgba(153,27,27,0.4), transparent 70%)',
  filter: 'blur(120px)',
};

const authCard = {
  position: 'relative',
  zIndex: 10,
  width: '100%',
  maxWidth: '475px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
  padding: '40px',
  border: '1px solid #f0f0f0',
};

const logo = {
  width: '200px',
  height: 'auto',
  display: 'block',
  margin: '0 auto 24px',
};

const footerLinks = {
  position: 'absolute',
  bottom: '24px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  fontSize: '12px',
  color: '#9ca3af',
};

const footerLink = {
  cursor: 'pointer',
  textDecoration: 'none',
};

footerLink[':hover'] = {
  textDecoration: 'underline',
};

const AuthSystem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');

  // 1️⃣ LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1️⃣ Encrypt credentials
      const encrypted = await getEncryptedData({ userName: username, password });
      console.log("Encrypted:", encrypted);

      // 2️⃣ Call bank login API
      const loginResponse = await performBankLogin(encrypted);
      console.log("Bank Response:", loginResponse.data);

      // 3️⃣ Decrypt the response
      const decrypted = await getDecryptedData(loginResponse.data);
      console.log("Decrypted:", decrypted);

      // 4️⃣ Save token and navigate
      if (decrypted?.status === 'SUCCESS' && decrypted?.token) {
        localStorage.setItem('access_token', decrypted.token);
        
        // Optional: fetch dashboard data
        try {
          const dashboardRes = await dashboardapi(`Bearer ${decrypted.token}`);
          console.log("Dashboard:", dashboardRes.data);
        } catch (dashErr) {
          console.warn("Dashboard fetch failed:", dashErr.message);
        }

        navigate('/dashboard');
      } else {
        setError('Invalid credentials or login failed');
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ FORGOT PASSWORD HANDLER
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1️⃣ Encrypt email/username
      const encrypted = await getEncryptedData({ userName: forgotEmail });
      console.log("Forgot Encrypted:", encrypted);

      // 2️⃣ Call forgot password API
      const response = await forgotPassword(encrypted, forgotEmail);
      console.log("Forgot Response:", response.data);

      // 3️⃣ Decrypt response
      const decrypted = await getDecryptedData(response.data);
      console.log("Forgot Decrypted:", decrypted);

      if (decrypted?.status === 'SUCCESS') {
        alert('OTP sent to your registered email/mobile');
        setStep('login');
      } else {
        setError('Failed to send OTP');
      }

    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Form styles
const formTitle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px',
  textAlign: 'center',
  color: '#1a202c',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const label = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  color: '#4b5563',
  marginBottom: '4px',
};

const input = {
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

input[':focus'] = {
  borderColor: '#dc2626',
  boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.2)',
};

const passwordWrapper = {
  position: 'relative',
};

const passwordToggle = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#6b7280',
  padding: '4px',
};

const errorBox = {
  color: '#dc2626',
  fontSize: '14px',
  textAlign: 'center',
  backgroundColor: '#fef2f2',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #fecaca',
};

const submitButton = {
  width: '100%',
  backgroundColor: '#8B0000',
  color: 'white',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'background-color 0.2s',
};

submitButton[':hover'] = {
  backgroundColor: '#722f37',
};

submitButton[':disabled'] = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

const forgotPasswordLink = {
  textAlign: 'center',
};

const linkButton = {
  background: 'none',
  border: 'none',
  color: '#dc2626',
  fontSize: '14px',
  cursor: 'pointer',
  textDecoration: 'none',
};

linkButton[':hover'] = {
  textDecoration: 'underline',
};

// 3️⃣ RENDER LOGIN FORM
  if (step === 'login') {
    return (
      <CardWrapper>
        <h2 style={formTitle}>Login to your Account</h2>
        
        <form onSubmit={handleLogin} style={form}>
          <div style={formGroup}>
            <label style={label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={input}
              placeholder="Enter your username"
              required
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Password</label>
            <div style={passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={input}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={passwordToggle}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={errorBox}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={submitButton}
          >
            {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={forgotPasswordLink}>
            <button
              type="button"
              onClick={() => setStep('forgot')}
              style={linkButton}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </CardWrapper>
    );
  }

  // 4️⃣ RENDER FORGOT PASSWORD FORM
  if (step === 'forgot') {
    return (
      <CardWrapper>
        <h2 style={formTitle}>Forgot Password</h2>
        
        <form onSubmit={handleForgotPassword} style={form}>
          <div style={formGroup}>
            <label style={label}>Username / Email</label>
            <input
              type="text"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              style={input}
              placeholder="Enter your username or email"
              required
            />
          </div>

          {error && (
            <div style={errorBox}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={submitButton}
          >
            {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} /> : null}
            {loading ? 'Sending...' : 'Send OTP'}
          </button>

          <div style={forgotPasswordLink}>
            <button
              type="button"
              onClick={() => setStep('login')}
              style={linkButton}
            >
              Back to Login
            </button>
          </div>
        </form>
      </CardWrapper>
    );
  }

  return null;
};

export default AuthSystem;
