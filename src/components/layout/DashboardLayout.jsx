import React, { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    Clock,
    LayoutGrid,
    LogOut,
    Menu,
    UserCog,
    Wallet,
} from 'lucide-react';
import nsdlLogo from '../../assets/logo.png';
import watermark from '../../assets/watermark.png';

const USER_MGMT_CHILDREN = [
    {
        to: '/user-management/create-cbc-user',
        label: 'Create CBC User',
    },
    {
        to: '/user-management/user-request',
        label: 'User Request',
    },
    {
        to: '/user-management/user-list-report',
        label: 'User List Report',
    },
];

const ROUTE_TITLES = {
    '/dashboard': 'Dashboard',
    '/user-management/create-cbc-user': 'Create CBC User',
    '/user-management/user-request': 'User Request',
    '/user-management/user-list-report': 'User List Report',
    '/audit-trail': 'Audit Trail',
    '/wallet-adjustment': 'Wallet Adjustment',
};

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [umExpanded, setUmExpanded] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const onUserManagementPath = pathname.startsWith('/user-management');

    const displayLabel =
        localStorage.getItem('displayLabel') ||
        localStorage.getItem('username') ||
        'User';

    const handleLogout = () => {
        localStorage.clear();
        setMenuOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    useEffect(() => {
        if (pathname.startsWith('/user-management')) setUmExpanded(true);
    }, [pathname]);

    const sidebarWidth = sidebarCollapsed ? 72 : 228;
    const headerTitle = ROUTE_TITLES[pathname] || 'Dashboard';
    const showWelcomeWatermark = pathname === '/dashboard';

    return (
        <div style={layoutRoot}>
            <header style={topHeader}>
                <div style={logoStrip}>
                    <img src={nsdlLogo} alt="NSDL Payments Bank" style={headerLogo} />
                </div>
                <div style={maroonBar}>
                    <div style={barLeft}>
                        <button
                            type="button"
                            style={iconGhost}
                            aria-label="Toggle sidebar"
                            onClick={() =>
                                setSidebarCollapsed((c) => !c)
                            }
                        >
                            <Menu size={22} strokeWidth={2} />
                        </button>
                        <span style={barTitle}>{headerTitle}</span>
                    </div>
                    <div style={barRight}>
                        <button
                            type="button"
                            style={{ ...iconGhost, position: 'relative' }}
                            aria-label="Notifications"
                        >
                            <Bell size={22} strokeWidth={2} />
                            <span style={notifBadge}>9</span>
                        </button>
                        <div style={avatar} aria-hidden>
                            {displayLabel.slice(0, 2).toUpperCase()}
                        </div>
                        <span style={barUser}>{displayLabel}</span>
                        <div style={{ position: 'relative' }} ref={menuRef}>
                            <button
                                type="button"
                                style={iconGhost}
                                aria-expanded={menuOpen}
                                aria-haspopup="true"
                                aria-label="Account menu"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpen((o) => !o);
                                }}
                            >
                                <ChevronDown size={22} strokeWidth={2} />
                            </button>
                            {menuOpen ? (
                                <div style={dropdown}>
                                    <button
                                        type="button"
                                        style={dropdownItem}
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </header>

            <div style={bodyRow}>
                <aside
                    style={{
                        ...sidebarStyle,
                        width: sidebarWidth,
                        minWidth: sidebarWidth,
                    }}
                >
                    <nav style={navLinks}>
                        <NavLink
                            to="/dashboard"
                            end
                            style={({ isActive }) =>
                                navLinkStyle(isActive, sidebarCollapsed)
                            }
                        >
                            <LayoutGrid
                                size={20}
                                strokeWidth={2}
                                style={{ flexShrink: 0 }}
                            />
                            {!sidebarCollapsed ? (
                                <span style={navText}>Dashboard</span>
                            ) : null}
                        </NavLink>

                        {sidebarCollapsed ? (
                            <NavLink
                                to="/user-management/user-list-report"
                                style={({ isActive }) =>
                                    navLinkStyle(isActive, sidebarCollapsed)
                                }
                                title="User Management"
                            >
                                <UserCog
                                    size={20}
                                    strokeWidth={2}
                                    style={{ flexShrink: 0 }}
                                />
                            </NavLink>
                        ) : (
                            <>
                                <div style={widgetsLabel}>Widgets</div>
                                <div style={umBlock}>
                                    <button
                                        type="button"
                                        style={umParentBtn(onUserManagementPath)}
                                        onClick={() =>
                                            setUmExpanded((v) => !v)
                                        }
                                    >
                                        <UserCog
                                            size={20}
                                            strokeWidth={2}
                                        />
                                        <span style={umParentText}>
                                            User Management
                                        </span>
                                        {umExpanded ? (
                                            <ChevronDown size={18} />
                                        ) : (
                                            <ChevronRight size={18} />
                                        )}
                                    </button>
                                    {umExpanded ? (
                                        <div style={subNav}>
                                            {USER_MGMT_CHILDREN.map(
                                                ({ to, label }) => (
                                                    <NavLink
                                                        key={to}
                                                        to={to}
                                                        style={({
                                                            isActive,
                                                        }) =>
                                                            subNavLinkStyle(
                                                                isActive
                                                            )
                                                        }
                                                    >
                                                        {label}
                                                    </NavLink>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )}

                        <NavLink
                            to="/audit-trail"
                            style={({ isActive }) =>
                                navLinkStyle(isActive, sidebarCollapsed)
                            }
                        >
                            <Clock
                                size={20}
                                strokeWidth={2}
                                style={{ flexShrink: 0 }}
                            />
                            {!sidebarCollapsed ? (
                                <span style={navText}>Audit Trail</span>
                            ) : null}
                        </NavLink>

                        <NavLink
                            to="/wallet-adjustment"
                            style={({ isActive }) =>
                                navLinkStyle(isActive, sidebarCollapsed)
                            }
                        >
                            <Wallet
                                size={20}
                                strokeWidth={2}
                                style={{ flexShrink: 0 }}
                            />
                            {!sidebarCollapsed ? (
                                <span style={navText}>Wallet Adjustment</span>
                            ) : null}
                        </NavLink>
                    </nav>
                </aside>

                <div style={mainShell}>
                    {showWelcomeWatermark ? (
                        <div
                            style={{
                                ...watermarkLayer,
                                backgroundImage: `url(${watermark})`,
                            }}
                        />
                    ) : null}
                    <main style={mainInner}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

function navLinkStyle(isActive, collapsed) {
    const maroon = '#8B0000';
    const grey = '#4a5568';
    return {
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 12,
        justifyContent: collapsed ? 'center' : 'flex-start',
        color: isActive ? maroon : grey,
        textDecoration: 'none',
        padding: collapsed ? '12px 10px' : isActive ? '12px 14px 12px 10px' : '12px 14px',
        borderRadius: collapsed ? '8px' : '0 8px 8px 0',
        fontWeight: isActive ? 600 : 500,
        fontSize: '0.95rem',
        transition: 'color 0.15s, border-color 0.15s',
        borderLeft: !collapsed && isActive ? `4px solid ${maroon}` : '4px solid transparent',
        backgroundColor: isActive ? 'rgba(139, 0, 0, 0.04)' : 'transparent',
    };
}

function subNavLinkStyle(isActive) {
    const maroon = '#8B0000';
    return {
        display: 'block',
        padding: '10px 8px 10px 36px',
        margin: '2px 0',
        borderRadius: '6px',
        borderRight: isActive ? `3px solid ${maroon}` : '3px solid transparent',
        backgroundColor: isActive ? 'rgba(139, 0, 0, 0.08)' : 'transparent',
        color: isActive ? maroon : '#4a5568',
        fontWeight: isActive ? 600 : 500,
        fontSize: '0.875rem',
        textDecoration: 'none',
    };
}

function umParentBtn(activeSection) {
    const maroon = '#8B0000';
    return {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 10px',
        border: 'none',
        borderRadius: '8px',
        background: activeSection ? 'rgba(139, 0, 0, 0.04)' : 'transparent',
        color: activeSection ? maroon : '#4a5568',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        fontSize: '0.95rem',
    };
}

const layoutRoot = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
};

const topHeader = {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    minHeight: 56,
    alignItems: 'stretch',
};

const logoStrip = {
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    borderBottom: '1px solid #e8e8e8',
};

const headerLogo = {
    height: 40,
    width: 'auto',
    display: 'block',
};

const maroonBar = {
    flex: 1,
    background: '#8B0000',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    minHeight: 56,
};

const barLeft = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    minWidth: 0,
};

const barTitle = {
    fontSize: '1.1rem',
    fontWeight: 600,
};

const notifBadge = {
    position: 'absolute',
    top: -4,
    right: -6,
    background: '#e53e3e',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 700,
    minWidth: 18,
    height: 18,
    padding: '0 5px',
    borderRadius: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
};

const barRight = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
};

const iconGhost = {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const avatar = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #fde68a 0%, #d97706 100%)',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 700,
};

const barUser = {
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
};

const dropdown = {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: 8,
    background: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    minWidth: 160,
    zIndex: 50,
    overflow: 'hidden',
};

const dropdownItem = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 16px',
    border: 'none',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    color: '#1a202c',
};

const bodyRow = {
    display: 'flex',
    flex: 1,
    minHeight: 0,
};

const sidebarStyle = {
    background: '#ffffff',
    borderRight: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 12px',
    position: 'relative',
    transition: 'width 0.2s ease',
};

const navLinks = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: 8,
};

const widgetsLabel = {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#a0aec0',
    padding: '12px 10px 4px',
};

const umBlock = {
    marginBottom: 4,
};

const umParentText = {
    flex: 1,
    textAlign: 'left',
};

const subNav = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginBottom: 4,
};

const navText = {
    whiteSpace: 'nowrap',
};

const mainShell = {
    flex: 1,
    position: 'relative',
    background: '#F5F5F5',
    overflow: 'auto',
    minWidth: 0,
};

const watermarkLayer = {
    position: 'absolute',
    inset: 0,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'min(36vmin, 320px)',
    opacity: 0.07,
    pointerEvents: 'none',
};

const mainInner = {
    position: 'relative',
    zIndex: 1,
    minHeight: '100%',
};

export default DashboardLayout;
