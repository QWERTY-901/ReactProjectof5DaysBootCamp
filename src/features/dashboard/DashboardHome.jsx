import React, { use } from 'react';

const DashboardHome = ({ dataPromise }) => {
    const stats = use(dataPromise); // React 19 unwrapping
    const role = localStorage.getItem('role');

    return (
        <div style={{ padding: '20px' }}>
            <h1>{role === 'checker' ? 'Checker Dashboard' : 'Maker Operations'}</h1>
            <div style={gridStyle}>
                <div style={card}><h3>Total Merchants</h3><p>{stats.totalCount || 0}</p></div>
                <div style={card}><h3>Pending Review</h3><p>{stats.pendingCount || 0}</p></div>
                <div style={card}><h3>Active mATM</h3><p>{stats.activeTerminals || 0}</p></div>
            </div>

            {role === 'checker' && (
                <div style={approvalSection}>
                    <h4>Priority Approvals Required</h4>
                    <p>You have {stats.pendingCount} merchants waiting for KYC validation.</p>
                </div>
            )}
        </div>
    );
};

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' };
const card = { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const approvalSection = { marginTop: '40px', background: '#fff5f5', padding: '20px', borderRadius: '8px' };

export default DashboardHome;