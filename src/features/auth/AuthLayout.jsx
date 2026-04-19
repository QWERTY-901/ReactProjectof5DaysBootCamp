// src/features/auth/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import nsdlLogo from '../../assets/logo.png';
import watermark from '../../assets/watermark.png';

const AuthLayout = () => {
    return (
        <div className="auth-split-screen">
            <div style={brandColumn}>
                <header style={brandHeader}>
                    <img src={nsdlLogo} alt="NSDL Payments Bank" style={logoImg} />
                </header>

                <div style={featurePanel}>
                    <img
                        src={watermark}
                        alt=""
                        style={watermarkImg}
                        aria-hidden
                    />
                </div>
            </div>

            <div style={formColumn}>
                <div style={formInner}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const brandColumn = {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 56px',
    borderRight: '1px solid #f0f0f0',
};

const brandHeader = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '36px',
};

const logoImg = {
    height: '48px',
    width: 'auto',
    display: 'block',
};

const featurePanel = {
    flex: 1,
    minHeight: '280px',
    backgroundColor: '#e8eaed',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
};

const watermarkImg = {
    width: '55%',
    maxWidth: '260px',
    opacity: 0.22,
    objectFit: 'contain',
};

const formColumn = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px 40px',
};

const formInner = {
    width: '100%',
    maxWidth: '420px',
};

export default AuthLayout;
