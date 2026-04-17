import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { LayoutDashboard, FileBarChart, Users, Settings, LogOut, ShieldCheck } from 'lucide-react';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // maker or checker
    const username = localStorage.getItem('username') || 'Bank User';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={layoutContainer}>
            {/* 1. SIDEBAR */}
            <aside style={sidebarStyle}>
                <div style={logoSection}>
                    <ShieldCheck size={32} color="#fff" />
                    <h2 style={logoText}>NSDL Admin</h2>
                </div>

                <nav style={navLinks}>
                    <Link to="/dashboard" style={linkItem}><LayoutDashboard size={20} /> Dashboard</Link>
                    <Link to="/reports" style={linkItem}><FileBarChart size={20} /> Reports</Link>

                    {/* Conditional Link: Only show Merchant Management to Checkers */}
                    {role?.includes('checker') && (
                        <Link to="/merchants" style={linkItem}><Users size={20} /> Merchant Approval</Link>
                    )}

                    <Link to="/settings" style={linkItem}><Settings size={20} /> Settings</Link>
                </nav>

                <button onClick={handleLogout} style={logoutBtn}>
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div style={contentWrapper}>
                <header style={headerStyle}>
                    <div>
                        <span style={roleBadge}>{role?.toUpperCase()}</span>
                    </div>
                    <div style={userProfile}>
                        <span>Welcome, <strong>{username}</strong></span>
                        <div style={avatarCircle}>{username[0].toUpperCase()}</div>
                    </div>
                </header>

                <main style={mainContent}>
                    <Outlet /> {/* Child routes render here! */}
                </main>
            </div>
        </div>
    );
};

// --- STYLES ---
const layoutContainer = { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' };

const sidebarStyle = {
    width: '260px', background: '#1a365d', color: '#fff',
    display: 'flex', flexDirection: 'column', padding: '20px'
};

const logoSection = { display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '30px', borderBottom: '1px solid #2d4a77', marginBottom: '20px' };
const logoText = { fontSize: '1.2rem', fontWeight: 'bold', margin: 0 };

const navLinks = { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 };
const linkItem = {
    display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e0',
    textDecoration: 'none', padding: '12px', borderRadius: '8px', transition: '0.2s'
};

const contentWrapper = { flex: 1, display: 'flex', flexDirection: 'column', background: '#f7fafc', overflowY: 'auto' };

const headerStyle = {
    height: '70px', background: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '0 30px', borderBottom: '1px solid #e2e8f0'
};

const roleBadge = { background: '#ebf8ff', color: '#2b6cb0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' };

const userProfile = { display: 'flex', alignItems: 'center', gap: '12px' };
const avatarCircle = { width: '35px', height: '35px', background: '#2b6cb0', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };

const mainContent = { padding: '30px', flex: 1 };

const logoutBtn = {
    marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px',
    background: 'transparent', border: '1px solid #4a5568', color: '#fff',
    padding: '12px', borderRadius: '8px', cursor: 'pointer'
};

export default DashboardLayout;