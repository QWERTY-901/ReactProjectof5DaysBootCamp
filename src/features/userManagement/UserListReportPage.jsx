import React, { useState } from 'react';
import {
    ArrowUpDown,
    Calendar,
    Download,
    Eye,
    Search,
    User,
} from 'lucide-react';
import {
    STATUS_FILTER_OPTIONS,
    USER_TYPE_OPTIONS,
} from './userManagementConstants';

const PAGE_COPY = {
    report: {
        crumb: 'User List Report',
        title: 'User List Report',
    },
    request: {
        crumb: 'User Request',
        title: 'User Request',
    },
};

const WIDE_MOCK = [
    {
        id: 1,
        userName: 'Carson Barrin',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '10/06/2024',
        createdBy: 'Carson',
        updatedDate: '10/06/2024',
        updatedBy: 'Carson',
        mobile: '938376439',
        email: 'carson@mail.com',
        parentUsername: 'Krishna Das',
        cscName: 'Krishna Das',
        mdsName: 'Krishna Das',
        dsName: 'Krishna Das',
        address: 'Krishna Das',
        role: 'Maker',
        status: 'Active',
        updatedStatus: '',
        updatePhone: '+91 9383764393',
        updateEmail: 'johndoe@gmail.com',
    },
    {
        id: 2,
        userName: 'Ashy Handpun',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '19/06/2024',
        createdBy: 'Ashy',
        updatedDate: '19/06/2024',
        updatedBy: 'Ashy',
        mobile: '938376439',
        email: 'ashy@mail.com',
        parentUsername: 'Krishna Das',
        cscName: 'Krishna Das',
        mdsName: 'Krishna Das',
        dsName: 'Krishna Das',
        address: 'Krishna Das',
        role: 'Checker',
        status: 'Active',
        updatedStatus: '',
        updatePhone: '+91 9383764393',
        updateEmail: 'ashy@mail.com',
    },
    {
        id: 3,
        userName: 'Ashy Handpun',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '19/06/2024',
        createdBy: 'Ashy',
        updatedDate: '19/06/2024',
        updatedBy: 'Ashy',
        mobile: '938376439',
        email: 'ashy@mail.com',
        parentUsername: 'Krishna Das',
        cscName: 'Krishna Das',
        mdsName: 'Krishna Das',
        dsName: 'Krishna Das',
        address: 'Krishna Das',
        role: 'Maker',
        status: 'Active',
        updatedStatus: '',
        updatePhone: '+91 9383764393',
        updateEmail: 'johndoe@gmail.com',
    },
];

const NARROW_MOCK = [
    {
        id: 1,
        userName: 'Carson Darrin',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '19/06/2024',
        createdBy: '—',
        updatedDate: '—',
        updatedBy: '—',
    },
    {
        id: 2,
        userName: 'Ashy Handgun',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '19/06/2024',
        createdBy: '—',
        updatedDate: '—',
        updatedBy: '—',
    },
    {
        id: 3,
        userName: 'Ashy Handgun',
        userType: 'Maker',
        firstName: 'Krishna',
        lastName: 'Das',
        dateCreated: '19/06/2024',
        createdBy: '—',
        updatedDate: '—',
        updatedBy: '—',
    },
];

function UserListReportPage({ variant = 'report' }) {
    const copy = PAGE_COPY[variant] || PAGE_COPY.report;

    const [searchMode, setSearchMode] = useState('date');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterUserType, setFilterUserType] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedId, setSelectedId] = useState(3);
    const [rowsPerPage, setRowsPerPage] = useState('5');
    const [goToPage, setGoToPage] = useState('2');
    const [currentPage, setCurrentPage] = useState(6);
    const [rowUpdatedStatus, setRowUpdatedStatus] = useState({
        1: '',
        2: '',
        3: '',
    });

    const maxPage = 56;

    const SortHead = ({ children }) => (
        <span style={thInner}>
            {children}
            <ArrowUpDown size={12} style={sortIcon} aria-hidden />
        </span>
    );

    const UserCell = ({ name }) => (
        <span style={userCell}>
            <span style={userAvatar} aria-hidden>
                <User size={14} color="#718096" />
            </span>
            {name}
        </span>
    );

    const dateFilters = searchMode === 'date';
    const tableRows = dateFilters ? WIDE_MOCK : NARROW_MOCK;

    return (
        <div style={page}>
            <nav style={breadcrumb} aria-label="Breadcrumb">
                <span style={crumbMuted}>User Management</span>
                <span style={crumbSep}>/</span>
                <span style={crumbActive}>{copy.crumb}</span>
            </nav>

            <h1 style={title}>{copy.title}</h1>

            <div style={radioRow}>
                <label style={radioLabel}>
                    <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'date'}
                        onChange={() => setSearchMode('date')}
                    />
                    Search by Date Range
                </label>
                <label style={radioLabel}>
                    <input
                        type="radio"
                        name="searchMode"
                        checked={searchMode === 'username'}
                        onChange={() => setSearchMode('username')}
                    />
                    Search by User Name
                </label>
            </div>

            {searchMode === 'username' ? (
                <div style={searchBarWrap}>
                    <Search size={18} style={searchIcon} aria-hidden />
                    <input
                        type="search"
                        placeholder="Search by User Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInput}
                    />
                </div>
            ) : (
                <div style={filterToolbar}>
                    <label style={dateField}>
                        <span style={filterLabel}>Start date</span>
                        <span style={dateInputWrap}>
                            <Calendar
                                size={16}
                                style={dateIcon}
                                aria-hidden
                            />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                                style={dateInput}
                            />
                        </span>
                    </label>
                    <label style={dateField}>
                        <span style={filterLabel}>End date</span>
                        <span style={dateInputWrap}>
                            <Calendar
                                size={16}
                                style={dateIcon}
                                aria-hidden
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={dateInput}
                            />
                        </span>
                    </label>
                    <label style={selectField}>
                        <span style={filterLabel}>User Type</span>
                        <select
                            value={filterUserType}
                            onChange={(e) =>
                                setFilterUserType(e.target.value)
                            }
                            style={filterSelect}
                        >
                            <option value="">Select</option>
                            {USER_TYPE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label style={selectField}>
                        <span style={filterLabel}>Status</span>
                        <select
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value)
                            }
                            style={filterSelect}
                        >
                            {STATUS_FILTER_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="button" style={downloadToolbarBtn}>
                        <Download size={18} />
                        Download Sample File
                    </button>
                </div>
            )}

            <div style={card}>
                <div style={tableWrap}>
                    {dateFilters ? (
                        <table style={wideTable}>
                            <thead>
                                <tr>
                                    <th
                                        style={{ ...th, width: 40 }}
                                        aria-label="Select"
                                    />
                                    <th style={th}>
                                        <SortHead>User Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>User Type</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>First Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Last Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Date Created</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Created By</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Updated Date</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Updated By</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Mobile No.</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Email ID</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Parent Username</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>CSC Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>MDS Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>DS Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Address</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Role</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Status</SortHead>
                                    </th>
                                    <th style={th}>Updated Status</th>
                                    <th style={th}>
                                        <SortHead>Update Phone</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Update Email</SortHead>
                                    </th>
                                    <th style={th}>Action</th>
                                    <th style={th}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row) => {
                                    const sel = selectedId === row.id;
                                    return (
                                        <tr
                                            key={row.id}
                                            style={
                                                sel ? rowSelected : rowPlain
                                            }
                                            onClick={() =>
                                                setSelectedId(row.id)
                                            }
                                        >
                                            <td style={td}>
                                                <input
                                                    type="checkbox"
                                                    checked={sel}
                                                    onChange={() =>
                                                        setSelectedId(row.id)
                                                    }
                                                    style={checkbox}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    aria-label={`Select ${row.userName}`}
                                                />
                                            </td>
                                            <td style={td}>
                                                <UserCell
                                                    name={row.userName}
                                                />
                                            </td>
                                            <td style={td}>{row.userType}</td>
                                            <td style={td}>{row.firstName}</td>
                                            <td style={td}>{row.lastName}</td>
                                            <td style={td}>
                                                {row.dateCreated}
                                            </td>
                                            <td style={td}>{row.createdBy}</td>
                                            <td style={td}>
                                                {row.updatedDate}
                                            </td>
                                            <td style={td}>{row.updatedBy}</td>
                                            <td style={td}>{row.mobile}</td>
                                            <td style={td}>{row.email}</td>
                                            <td style={td}>
                                                {row.parentUsername}
                                            </td>
                                            <td style={td}>{row.cscName}</td>
                                            <td style={td}>{row.mdsName}</td>
                                            <td style={td}>{row.dsName}</td>
                                            <td style={td}>{row.address}</td>
                                            <td style={td}>{row.role}</td>
                                            <td style={td}>
                                                <span style={statusActive}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td style={td}>
                                                <select
                                                    value={
                                                        rowUpdatedStatus[
                                                            row.id
                                                        ] ?? ''
                                                    }
                                                    onChange={(e) =>
                                                        setRowUpdatedStatus(
                                                            (s) => ({
                                                                ...s,
                                                                [row.id]: e
                                                                    .target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    style={cellSelect}
                                                >
                                                    <option value="">
                                                        Select
                                                    </option>
                                                    <option value="active">
                                                        Active
                                                    </option>
                                                    <option value="inactive">
                                                        Inactive
                                                    </option>
                                                </select>
                                            </td>
                                            <td style={td}>
                                                {row.updatePhone}
                                            </td>
                                            <td style={td}>
                                                {row.updateEmail}
                                            </td>
                                            <td style={td}>
                                                <button
                                                    type="button"
                                                    style={linkBtn}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    Update
                                                </button>
                                            </td>
                                            <td style={td}>
                                                <button
                                                    type="button"
                                                    style={linkBtn}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Eye
                                                        size={14}
                                                        style={{
                                                            marginRight: 4,
                                                            verticalAlign:
                                                                'middle',
                                                        }}
                                                    />
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <table style={narrowTable}>
                            <thead>
                                <tr>
                                    <th
                                        style={{ ...th, width: 44 }}
                                        aria-label="Select"
                                    />
                                    <th style={th}>
                                        <SortHead>User Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>User Type</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>First Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Last Name</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Date Created</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Created By</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Updated Date</SortHead>
                                    </th>
                                    <th style={th}>
                                        <SortHead>Updated By</SortHead>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row) => {
                                    const sel = selectedId === row.id;
                                    return (
                                        <tr
                                            key={row.id}
                                            style={
                                                sel ? rowSelected : rowPlain
                                            }
                                            onClick={() =>
                                                setSelectedId(row.id)
                                            }
                                        >
                                            <td style={td}>
                                                <input
                                                    type="checkbox"
                                                    checked={sel}
                                                    onChange={() =>
                                                        setSelectedId(row.id)
                                                    }
                                                    style={checkbox}
                                                    aria-label={`Select ${row.userName}`}
                                                />
                                            </td>
                                            <td style={td}>{row.userName}</td>
                                            <td style={td}>{row.userType}</td>
                                            <td style={td}>{row.firstName}</td>
                                            <td style={td}>{row.lastName}</td>
                                            <td style={td}>
                                                {row.dateCreated}
                                            </td>
                                            <td style={td}>{row.createdBy}</td>
                                            <td style={td}>
                                                {row.updatedDate}
                                            </td>
                                            <td style={td}>{row.updatedBy}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                <div style={footer}>
                    <label style={footerGroup}>
                        Row per page:
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(e.target.value)}
                            style={select}
                        >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </label>
                    <label style={footerGroup}>
                        Go to:
                        <input
                            type="number"
                            min={1}
                            value={goToPage}
                            onChange={(e) => setGoToPage(e.target.value)}
                            style={goInput}
                        />
                    </label>
                    <div style={pager}>
                        <button
                            type="button"
                            style={pageBtn}
                            onClick={() => setCurrentPage(1)}
                        >
                            «
                        </button>
                        <button
                            type="button"
                            style={pageBtn}
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                        >
                            ‹
                        </button>
                        {[1, '…', 4, 5, 6, 7, '…', maxPage].map((p, i) =>
                            p === '…' ? (
                                <span key={`e${i}`} style={ellipsis}>
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    type="button"
                                    style={{
                                        ...pageBtn,
                                        ...(currentPage === p
                                            ? pageBtnActive
                                            : {}),
                                    }}
                                    onClick={() => setCurrentPage(p)}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            type="button"
                            style={pageBtn}
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(maxPage, p + 1)
                                )
                            }
                        >
                            ›
                        </button>
                        <button
                            type="button"
                            style={pageBtn}
                            onClick={() => setCurrentPage(maxPage)}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const maroon = '#8B0000';

const page = {
    padding: '20px 24px 32px',
    maxWidth: '100%',
    margin: '0 auto',
};

const breadcrumb = {
    fontSize: '0.9rem',
    marginBottom: '12px',
};

const crumbMuted = { color: '#718096' };
const crumbSep = { margin: '0 8px', color: '#cbd5e0' };
const crumbActive = { color: '#2d3748', fontWeight: 600 };

const title = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#1a202c',
    margin: '0 0 20px 0',
};

const radioRow = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    marginBottom: '16px',
};

const radioLabel = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    color: '#4a5568',
    cursor: 'pointer',
};

const searchBarWrap = {
    position: 'relative',
    maxWidth: '420px',
    marginBottom: '20px',
};

const searchIcon = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
};

const searchInput = {
    width: '100%',
    padding: '10px 12px 10px 40px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
};

const filterToolbar = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: '16px',
    marginBottom: '20px',
};

const filterLabel = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: '6px',
};

const dateField = {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '150px',
};

const dateInputWrap = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
};

const dateIcon = {
    position: 'absolute',
    left: 10,
    color: '#718096',
    pointerEvents: 'none',
};

const dateInput = {
    width: '100%',
    padding: '8px 10px 8px 36px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
};

const selectField = {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '160px',
};

const filterSelect = {
    padding: '8px 10px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    background: '#fff',
};

const downloadToolbarBtn = {
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: maroon,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
};

const card = {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
};

const tableWrap = {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
};

const narrowTable = {
    width: '100%',
    minWidth: '960px',
    borderCollapse: 'collapse',
    fontSize: '0.85rem',
};

const wideTable = {
    width: '100%',
    minWidth: '2800px',
    borderCollapse: 'collapse',
    fontSize: '0.78rem',
};

const th = {
    background: '#f7fafc',
    color: '#2d3748',
    fontWeight: 600,
    padding: '10px 8px',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap',
};

const thInner = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
};

const sortIcon = { color: '#a0aec0', flexShrink: 0 };

const rowPlain = {
    borderBottom: '1px solid #edf2f7',
    cursor: 'pointer',
};

const rowSelected = {
    ...rowPlain,
    background: '#f7fafc',
};

const td = {
    padding: '10px 8px',
    color: '#2d3748',
    verticalAlign: 'middle',
};

const userCell = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
};

const userAvatar = {
    width: 26,
    height: 26,
    borderRadius: '50%',
    background: '#edf2f7',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};

const statusActive = {
    color: '#16a34a',
    fontWeight: 600,
};

const cellSelect = {
    padding: '4px 8px',
    fontSize: '0.78rem',
    borderRadius: '4px',
    border: '1px solid #cbd5e0',
    maxWidth: '120px',
};

const linkBtn = {
    background: 'none',
    border: 'none',
    padding: 0,
    color: maroon,
    fontWeight: 600,
    fontSize: '0.78rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
};

const checkbox = {
    width: 16,
    height: 16,
    accentColor: maroon,
    cursor: 'pointer',
};

const footer = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 16px',
    borderTop: '1px solid #edf2f7',
    fontSize: '0.9rem',
    color: '#4a5568',
};

const footerGroup = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
};

const select = {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '0.9rem',
};

const goInput = {
    width: '52px',
    padding: '6px 8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '0.9rem',
};

const pager = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: 'auto',
    flexWrap: 'wrap',
};

const pageBtn = {
    minWidth: '32px',
    height: '32px',
    padding: '0 6px',
    border: '1px solid #cbd5e0',
    background: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#4a5568',
};

const pageBtnActive = {
    border: `2px solid ${maroon}`,
    color: maroon,
    fontWeight: 700,
};

const ellipsis = {
    padding: '0 4px',
    userSelect: 'none',
};

export default UserListReportPage;
