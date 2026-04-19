import React, { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';

const PAGE_SIZE = 10;
const TOTAL = 50;

const MOCK_ROWS = [
    { sno: 1, fieldName: 'KYC Status', userName: 'Maker', userId: 'mkA102', adminName: 'Sarah Chen', adminId: 'sarah.chen@bank.com', createdDate: '2014-06-01' },
    { sno: 2, fieldName: 'Wallet Limit', userName: 'Checker', userId: 'ryD306', adminName: 'Jonathan Velasquez', adminId: 'russellsamuel@yahoo.com', createdDate: '2014-06-03' },
    { sno: 3, fieldName: 'Merchant ID', userName: 'Maker', userId: 'abK441', adminName: 'Priya Nair', adminId: 'priya.nair@bank.com', createdDate: '2014-06-04' },
    { sno: 4, fieldName: 'Terminal Block', userName: 'Checker', userId: 'zxP882', adminName: 'Michael Ortiz', adminId: 'm.ortiz@partner.com', createdDate: '2014-06-05' },
    { sno: 5, fieldName: 'Commission', userName: 'Maker', userId: 'lmQ119', adminName: 'Jonathan Velasquez', adminId: 'russellsamuel@yahoo.com', createdDate: '2014-06-06' },
    { sno: 6, fieldName: 'IFSC Update', userName: 'Checker', userId: 'ryD306', adminName: 'Anita Rao', adminId: 'anita.rao@bank.com', createdDate: '2014-06-07' },
    { sno: 7, fieldName: 'Risk Flag', userName: 'Maker', userId: 'cdF773', adminName: 'Jonathan Velasquez', adminId: 'russellsamuel@yahoo.com', createdDate: '2014-06-08' },
    { sno: 8, fieldName: 'Settlement', userName: 'Checker', userId: 'opT221', adminName: 'Vikram Singh', adminId: 'vikram.singh@bank.com', createdDate: '2014-06-09' },
    { sno: 9, fieldName: 'Profile Edit', userName: 'Maker', userId: 'nmY554', adminName: 'Jonathan Velasquez', adminId: 'russellsamuel@yahoo.com', createdDate: '2014-06-10' },
    { sno: 10, fieldName: 'Document', userName: 'Checker', userId: 'ryD306', adminName: 'Elena Frost', adminId: 'elena.frost@bank.com', createdDate: '2014-06-11' },
];

const AuditTrailPage = () => {
    const today = useMemo(() => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    }, []);

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filteredRows = useMemo(() => {
        if (!search.trim()) return MOCK_ROWS;
        const q = search.toLowerCase();
        return MOCK_ROWS.filter(
            (r) =>
                Object.values(r).some((v) =>
                    String(v).toLowerCase().includes(q)
                )
        );
    }, [search]);

    const totalPages = Math.max(1, Math.ceil(TOTAL / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE, TOTAL);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div style={pageWrap}>
            <div style={card}>
                <form style={filterRow} onSubmit={handleSubmit}>
                    <label style={field}>
                        <span style={label}>From Date</span>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={input}
                        />
                    </label>
                    <label style={field}>
                        <span style={label}>To Date</span>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={input}
                        />
                    </label>
                    <label style={{ ...field, flex: '1 1 180px' }}>
                        <span style={label}>Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={input}
                            placeholder=""
                        />
                    </label>
                    <button type="submit" style={submitBtn}>
                        Submit
                    </button>
                </form>

                <div style={toolbar}>
                    <div style={searchWrap}>
                        <Search size={18} style={searchIcon} aria-hidden />
                        <input
                            type="search"
                            placeholder="Search Here"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={searchInput}
                        />
                    </div>
                    <button type="button" style={downloadBtn}>
                        <Download size={18} />
                        Download Sample File
                    </button>
                </div>

                <div style={tableScroll}>
                    <table style={table}>
                        <thead>
                            <tr>
                                {[
                                    'Sno',
                                    'Field Name',
                                    'User Name',
                                    'User ID',
                                    'Admin Name',
                                    'Admin ID',
                                    'Created Date',
                                ].map((h) => (
                                    <th key={h} style={th}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRows.map((row) => (
                                <tr
                                    key={row.sno}
                                    style={
                                        row.sno === 2 ? rowHighlight : rowBase
                                    }
                                >
                                    <td style={td}>{row.sno}</td>
                                    <td style={td}>{row.fieldName}</td>
                                    <td style={td}>{row.userName}</td>
                                    <td style={td}>{row.userId}</td>
                                    <td style={td}>{row.adminName}</td>
                                    <td style={td}>{row.adminId}</td>
                                    <td style={td}>{row.createdDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={pagination}>
                    <span style={pageSummary}>
                        {start} to {end} of {TOTAL}
                    </span>
                    <div style={pageControls}>
                        <button
                            type="button"
                            style={pageBtn}
                            disabled={page <= 1}
                            onClick={() => setPage(1)}
                            aria-label="First page"
                        >
                            ««
                        </button>
                        <button
                            type="button"
                            style={pageBtn}
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                        >
                            ‹
                        </button>
                        <span style={pageInfo}>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            type="button"
                            style={pageBtn}
                            disabled={page >= totalPages}
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                            aria-label="Next page"
                        >
                            ›
                        </button>
                        <button
                            type="button"
                            style={pageBtn}
                            disabled={page >= totalPages}
                            onClick={() => setPage(totalPages)}
                            aria-label="Last page"
                        >
                            »»
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const maroon = '#8B0000';

const pageWrap = {
    padding: '20px 24px 32px',
    minHeight: '100%',
};

const card = {
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
};

const filterRow = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    marginBottom: '20px',
};

const field = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: '0 1 160px',
};

const label = {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#4a5568',
};

const input = {
    padding: '8px 10px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
};

const submitBtn = {
    background: maroon,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 28px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    alignSelf: 'flex-end',
};

const toolbar = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
};

const searchWrap = {
    position: 'relative',
    flex: '1 1 220px',
    maxWidth: '320px',
};

const searchIcon = {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    pointerEvents: 'none',
};

const searchInput = {
    width: '100%',
    padding: '8px 12px 8px 36px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
};

const downloadBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#4a5568',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
};

const tableScroll = {
    overflowX: 'auto',
    marginBottom: '16px',
};

const table = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
};

const th = {
    background: '#f7fafc',
    color: '#2d3748',
    fontWeight: 600,
    padding: '12px 10px',
    textAlign: 'center',
    borderBottom: '2px solid #e2e8f0',
    borderRight: '1px solid #e2e8f0',
    whiteSpace: 'nowrap',
};

const rowBase = {
    borderBottom: '1px solid #e2e8f0',
};

const rowHighlight = {
    borderBottom: '1px solid #e2e8f0',
    background: '#e8f4fc',
};

const td = {
    padding: '12px 10px',
    textAlign: 'center',
    color: '#2d3748',
    verticalAlign: 'middle',
};

const pagination = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '8px',
    borderTop: '1px solid #edf2f7',
    fontSize: '0.9rem',
    color: '#4a5568',
};

const pageSummary = {
    fontWeight: 500,
};

const pageControls = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

const pageBtn = {
    minWidth: '32px',
    height: '32px',
    padding: '0 8px',
    border: '1px solid #cbd5e0',
    background: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
};

const pageInfo = {
    padding: '0 8px',
    fontWeight: 500,
};

export default AuditTrailPage;
