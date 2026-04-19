import React from 'react';
import { Link } from 'react-router';
// Import local assets for reliability
import nsdlLogo from '../../assets/logo.png';
import watermark from '../../assets/watermark.png';

const LandingPage = () => {
    return (
        <div style={container}>
            <main style={mainContent}>
                {/* 1. Left Side: Branding/Image Area */}
                <div style={brandSide}>
                    <header style={headerWrapper}>
                        <img
                            src={nsdlLogo}
                            alt="NSDL Payments Bank"
                            style={logoImg}
                        />
                    </header>
                    <div style={illustrationWrapper}>
                        <img
                            src={watermark}
                            alt="Banking Illustration"
                            style={illustrationImg}
                        />
                    </div>
                </div>

                {/* 2. Right Side: Welcome & Action Area */}
                <div style={actionSide}>
                    <div style={formContainer}>
                        <h1 style={welcomeText}>Welcome Back!</h1>
                        <p style={subText}>Please enter your details</p>

                        <div style={buttonContainer}>
                            {/* In a real scenario, the full LoginForm would be here */}
                            <Link to="/login" style={primaryBtn}>
                                Go to Login
                            </Link>
                            <p style={footerNote}>
                                Access the secure staging environment for merchant onboarding and reports.
                            </p>
                        </div>

                        <footer style={footerStyle}>
                            © 2026 Echelon Industries | Authorized Access Only
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- STYLING (Replicating Layout A Split-Screen) ---
const container = {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#fff',
    fontFamily: 'Inter, sans-serif'
};

const mainContent = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Splits screen exactly in half
    height: '100%'
};

const brandSide = {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 10%',
    backgroundColor: '#fff',
    borderRight: '1px solid #f0f0f0'
};

const headerWrapper = { marginBottom: '60px' };
const logoImg = { height: '45px' };

const illustrationWrapper = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const illustrationImg = {
    width: '55%',
    maxWidth: '280px',
    opacity: 0.15 // Faint watermark look like the live site
};

const actionSide = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px'
};

const formContainer = {
    width: '100%',
    maxWidth: '400px'
};

const welcomeText = {
    fontSize: '2.5rem',
    color: '#000',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
};

const subText = {
    color: '#718096',
    fontSize: '1rem',
    marginBottom: '40px'
};

const primaryBtn = {
    display: 'block',
    textAlign: 'center',
    backgroundColor: '#8a0a0b', // NSDL Maroon
    color: '#fff',
    padding: '16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem'
};

const footerNote = {
    marginTop: '20px',
    fontSize: '0.85rem',
    color: '#a0aec0',
    textAlign: 'center'
};

const footerStyle = {
    textAlign: 'center',
    marginTop: '60px',
    color: '#cbd5e0',
    fontSize: '0.75rem'
};

export default LandingPage;