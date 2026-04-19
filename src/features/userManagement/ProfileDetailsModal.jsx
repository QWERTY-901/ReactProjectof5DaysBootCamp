import React, { useState } from 'react';
import { X, User, Calendar, Mail, Phone, MapPin, FileText, Shield, Globe, Search } from 'lucide-react';

const ProfileDetailsModal = ({ isOpen, onClose, user }) => {
    const [activeTab, setActiveTab] = useState('basic');

    if (!isOpen || !user) return null;

    const tabs = [
        { id: 'basic', label: 'Basic Details' },
        { id: 'pan', label: 'PAN Details' },
        { id: 'aadhar', label: 'Aadhar Details' },
        { id: 'matching', label: 'Matching Details' },
        { id: 'geo', label: 'Geo-Tagging Analysis' },
        { id: 'browser', label: 'Browser Data' },
    ];

    const handleReject = () => {
        console.log('User rejected:', user.userName);
        // Add reject logic here
        onClose();
    };

    const handleApprove = () => {
        console.log('User approved:', user.userName);
        // Add approve logic here
        onClose();
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'basic':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>Name</span>
                                <span style={detailValue}>{user.firstName} {user.lastName}</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>GSTIN</span>
                                <span style={detailValue}>29AAAPL1234C1ZV</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>PIN</span>
                                <span style={detailValue}>560001</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>City</span>
                                <span style={detailValue}>Bangalore</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>State</span>
                                <span style={detailValue}>Karnataka</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Address</span>
                                <span style={detailValue}>123, MG Road, Bangalore - 560001</span>
                            </div>
                        </div>
                    </div>
                );
            case 'pan':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>PAN Number</span>
                                <span style={detailValue}>AAAPL1234C</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Name on PAN</span>
                                <span style={detailValue}>{user.firstName} {user.lastName}</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Date of Birth</span>
                                <span style={detailValue}>15/01/1990</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Status</span>
                                <span style={detailValue}>Valid</span>
                            </div>
                        </div>
                    </div>
                );
            case 'aadhar':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>Aadhar Number</span>
                                <span style={detailValue}>XXXX-XXXX-1234</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Name on Aadhar</span>
                                <span style={detailValue}>{user.firstName} {user.lastName}</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Address</span>
                                <span style={detailValue}>123, MG Road, Bangalore - 560001</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Status</span>
                                <span style={detailValue}>Verified</span>
                            </div>
                        </div>
                    </div>
                );
            case 'matching':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>Name Match</span>
                                <span style={detailValue}>95%</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Address Match</span>
                                <span style={detailValue}>88%</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Overall Match</span>
                                <span style={detailValue}>91%</span>
                            </div>
                        </div>
                    </div>
                );
            case 'geo':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>IP Address</span>
                                <span style={detailValue}>192.168.1.1</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Location</span>
                                <span style={detailValue}>Bangalore, Karnataka</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Device</span>
                                <span style={detailValue}>Mobile</span>
                            </div>
                        </div>
                    </div>
                );
            case 'browser':
                return (
                    <div style={tabContent}>
                        <div style={detailGrid}>
                            <div style={detailItem}>
                                <span style={detailLabel}>Browser</span>
                                <span style={detailValue}>Chrome 120.0</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>Platform</span>
                                <span style={detailValue}>Windows 10</span>
                            </div>
                            <div style={detailItem}>
                                <span style={detailLabel}>User Agent</span>
                                <span style={detailValue}>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={modalOverlay}>
            <div style={modal}>
                {/* Header */}
                <div style={modalHeader}>
                    <div style={headerLeft}>
                        <div style={userAvatar}>
                            <User size={24} color="#718096" />
                        </div>
                        <div>
                            <h2 style={userName}>{user.firstName} {user.lastName}</h2>
                            <div style={userMeta}>
                                <span style={statusBadge}>Active</span>
                                <span style={userId}>ID: {user.id}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={closeBtn}>
                        <X size={20} />
                    </button>
                </div>

                {/* User Info */}
                <div style={userInfoSection}>
                    <div style={infoRow}>
                        <div style={infoItem}>
                            <User size={16} style={infoIcon} />
                            <span>{user.userName}</span>
                        </div>
                        <div style={infoItem}>
                            <Calendar size={16} style={infoIcon} />
                            <span>Created: {user.dateCreated}</span>
                        </div>
                        <div style={infoItem}>
                            <Calendar size={16} style={infoIcon} />
                            <span>Submitted: {user.dateCreated}</span>
                        </div>
                    </div>
                    <div style={infoRowLast}>
                        <div style={infoItem}>
                            <Mail size={16} style={infoIcon} />
                            <span>{user.email}</span>
                        </div>
                        <div style={infoItem}>
                            <Phone size={16} style={infoIcon} />
                            <span>{user.mobile}</span>
                        </div>
                        <div style={infoItem}>
                            <MapPin size={16} style={infoIcon} />
                            <span>Bangalore, Karnataka</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={tabsContainer}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...tabBtn,
                                ...(activeTab === tab.id ? tabBtnActive : {}),
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={tabContentContainer}>
                    {renderTabContent()}
                </div>

                {/* Actions */}
                <div style={modalFooter}>
                    <button onClick={handleReject} style={rejectBtn}>
                        Reject
                    </button>
                    <button onClick={handleApprove} style={approveBtn}>
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styles
const modalOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modal = {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const modalHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e2e8f0',
};

const headerLeft = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const userAvatar = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f7fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #e2e8f0',
};

const userName = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a202c',
};

const userMeta = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '4px',
};

const statusBadge = {
    backgroundColor: '#c6f6d5',
    color: '#22543d',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
};

const userId = {
    color: '#718096',
    fontSize: '0.875rem',
};

const closeBtn = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#718096',
    padding: '8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const userInfoSection = {
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
};

const infoRow = {
    display: 'flex',
    gap: '32px',
    marginBottom: '12px',
};

const infoRowLast = {
    marginBottom: 0,
};

const infoItem = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#4a5568',
};

const infoIcon = {
    color: '#a0aec0',
};

const tabsContainer = {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
};

const tabBtn = {
    background: 'none',
    border: 'none',
    padding: '16px 24px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#718096',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
};

const tabBtnActive = {
    color: '#3182ce',
    borderBottomColor: '#3182ce',
};

const tabContentContainer = {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
};

const tabContent = {
    minHeight: '200px',
};

const detailGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
};

const detailItem = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const detailLabel = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
};

const detailValue = {
    fontSize: '0.875rem',
    color: '#1a202c',
};

const modalFooter = {
    padding: '24px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#f8fafc',
};

const rejectBtn = {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};


const approveBtn = {
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};



export default ProfileDetailsModal;
