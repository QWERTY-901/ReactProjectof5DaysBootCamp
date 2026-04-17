import React, { use } from 'react';
import { fetchMerchants } from '../../actions/merchants';

const MerchantList = ({ listPromise }) => {
    const merchants = use(listPromise);
    const role = localStorage.getItem('role');

    return (
        <div style={container}>
            <div style={header}>
                <h2>Merchant Management</h2>
                {role === 'maker' && <button style={addBtn}>+ Onboard New Merchant</button>}
            </div>

            <table style={tableStyle}>
                <thead>
                    <tr style={theadStyle}>
                        <th>Merchant Name</th>
                        <th>Mobile</th>
                        <th>Terminal ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {merchants.map((m) => (
                        <tr key={m.userId} style={trStyle}>
                            <td>{m.firstName} {m.lastName}</td>
                            <td>{m.mobileNumber}</td>
                            <td>{m.terminalId || 'N/A'}</td>
                            <td><StatusBadge status={m.status} /></td>
                            <td>
                                <button style={viewBtn}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Internal sub-component for Status logic
const StatusBadge = ({ status }) => {
    const colors = {
        ACTIVE: { bg: '#c6f6d5', text: '#22543d' },
        PENDING: { bg: '#feebc8', text: '#744210' },
        REJECTED: { bg: '#fed7d7', text: '#822727' },
    };
    const style = colors[status] || colors.PENDING;
    return (
        <span style={{
            padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem',
            fontWeight: 'bold', backgroundColor: style.bg, color: style.text
        }}>
            {status}
        </span>
    );
};

// Styles
const container = { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const theadStyle = { borderBottom: '2px solid #edf2f7', color: '#718096' };
const trStyle = { borderBottom: '1px solid #edf2f7', height: '50px' };
const addBtn = { background: '#1a365d', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' };
const viewBtn = { background: 'none', border: '1px solid #cbd5e0', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' };

export default MerchantList;