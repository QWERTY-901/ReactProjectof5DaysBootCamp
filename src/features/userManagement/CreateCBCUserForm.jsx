import React, { useState } from 'react';
import { X, Upload, Phone } from 'lucide-react';

const CreateCBCUserForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        // Left Column
        companyName: '',
        contactName: '',
        email: '',
        age: '',
        calculator: '',
        addressEmail: '',
        addressLine1: '',
        addressLine2: '',
        pincode: '',
        district: '',
        accountNumber: '',
        instructionType: '',
        affiliationId: '',
        agreementDate: '',
        pincodeBillCard: '',
        productCategory: '',
        
        // Right Column
        middleName: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        alternateNumber: '',
        country: 'India',
        state: '',
        city: '',
        gstNumber: '',
        telephoneNumber: '',
        numberOfStaff: '',
        agreementToWhom: '',
        incorporationAddressLine1: '',
        incorporationAddressLine2: '',
        
        // File uploads
        aadharCard: null,
        firstPageOfAgreement: null,
        businessProposal: null,
        
        // Consent
        consent: false,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleFileChange = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields validation
        if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
        if (!formData.contactName.trim()) newErrors.contactName = 'Contact Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.addressEmail.trim()) newErrors.addressEmail = 'Address Email is required';
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        if (!formData.district.trim()) newErrors.district = 'District is required';
        if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account Number is required';
        if (!formData.instructionType.trim()) newErrors.instructionType = 'Instruction Type is required';
        if (!formData.affiliationId.trim()) newErrors.affiliationId = 'Affiliation ID is required';
        if (!formData.agreementDate.trim()) newErrors.agreementDate = 'Agreement Date is required';
        if (!formData.productCategory.trim()) newErrors.productCategory = 'Product Category is required';
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST Number is required';
        if (!formData.telephoneNumber.trim()) newErrors.telephoneNumber = 'Telephone Number is required';
        if (!formData.incorporationAddressLine1.trim()) newErrors.incorporationAddressLine1 = 'Incorporation Address Line 1 is required';
        
        if (!formData.consent) newErrors.consent = 'You must agree to the terms and conditions';
        
        return newErrors;
    };

    const handleErase = () => {
        setFormData({
            companyName: '',
            contactName: '',
            email: '',
            age: '',
            calculator: '',
            addressEmail: '',
            addressLine1: '',
            addressLine2: '',
            pincode: '',
            district: '',
            accountNumber: '',
            instructionType: '',
            affiliationId: '',
            agreementDate: '',
            pincodeBillCard: '',
            productCategory: '',
            middleName: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
            alternateNumber: '',
            country: 'India',
            state: '',
            city: '',
            gstNumber: '',
            telephoneNumber: '',
            numberOfStaff: '',
            agreementToWhom: '',
            incorporationAddressLine1: '',
            incorporationAddressLine2: '',
            aadharCard: null,
            firstPageOfAgreement: null,
            businessProposal: null,
            consent: false,
        });
        setErrors({});
    };

    const handleSave = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        console.log('Form data submitted:', formData);
        // Add save logic here (API call, etc.)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={modalOverlay}>
            <div style={modal}>
                {/* Header */}
                <div style={modalHeader}>
                    <h2 style={modalTitle}>Create CBC User</h2>
                    <button onClick={onClose} style={closeBtn}>
                        <X size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <div style={formContainer}>
                    <div style={formGrid}>
                        {/* Left Column */}
                        <div style={column}>
                            <div style={formGroup}>
                                <label style={label}>Company Name*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.companyName ? inputError : {})}}
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    placeholder="Enter company name"
                                />
                                {errors.companyName && <span style={errorText}>{errors.companyName}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Contact Name*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.contactName ? inputError : {})}}
                                    value={formData.contactName}
                                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                                    placeholder="Enter contact name"
                                />
                                {errors.contactName && <span style={errorText}>{errors.contactName}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Email*</label>
                                <input
                                    type="email"
                                    style={{...input, ...(errors.email ? inputError : {})}}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter email"
                                />
                                {errors.email && <span style={errorText}>{errors.email}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Age</label>
                                <input
                                    type="number"
                                    style={input}
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="Enter age"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Calculator</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.calculator}
                                    onChange={(e) => handleInputChange('calculator', e.target.value)}
                                    placeholder="Enter calculator"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Address Email*</label>
                                <input
                                    type="email"
                                    style={{...input, ...(errors.addressEmail ? inputError : {})}}
                                    value={formData.addressEmail}
                                    onChange={(e) => handleInputChange('addressEmail', e.target.value)}
                                    placeholder="Enter address email"
                                />
                                {errors.addressEmail && <span style={errorText}>{errors.addressEmail}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Address Line 1*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.addressLine1 ? inputError : {})}}
                                    value={formData.addressLine1}
                                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                                    placeholder="Enter address line 1"
                                />
                                {errors.addressLine1 && <span style={errorText}>{errors.addressLine1}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Address Line 2</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.addressLine2}
                                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                                    placeholder="Enter address line 2"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Pincode*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.pincode ? inputError : {})}}
                                    value={formData.pincode}
                                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                                    placeholder="Enter pincode"
                                />
                                {errors.pincode && <span style={errorText}>{errors.pincode}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>District*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.district ? inputError : {})}}
                                    value={formData.district}
                                    onChange={(e) => handleInputChange('district', e.target.value)}
                                    placeholder="Enter district"
                                />
                                {errors.district && <span style={errorText}>{errors.district}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Account Number*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.accountNumber ? inputError : {})}}
                                    value={formData.accountNumber}
                                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                    placeholder="Enter account number"
                                />
                                {errors.accountNumber && <span style={errorText}>{errors.accountNumber}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Instruction Type*</label>
                                <select
                                    style={{...input, ...(errors.instructionType ? inputError : {})}}
                                    value={formData.instructionType}
                                    onChange={(e) => handleInputChange('instructionType', e.target.value)}
                                >
                                    <option value="">Select instruction type</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
                                    <option value="type3">Type 3</option>
                                </select>
                                {errors.instructionType && <span style={errorText}>{errors.instructionType}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Affiliation ID*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.affiliationId ? inputError : {})}}
                                    value={formData.affiliationId}
                                    onChange={(e) => handleInputChange('affiliationId', e.target.value)}
                                    placeholder="Enter affiliation ID"
                                />
                                {errors.affiliationId && <span style={errorText}>{errors.affiliationId}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Agreement Date*</label>
                                <input
                                    type="date"
                                    style={{...input, ...(errors.agreementDate ? inputError : {})}}
                                    value={formData.agreementDate}
                                    onChange={(e) => handleInputChange('agreementDate', e.target.value)}
                                />
                                {errors.agreementDate && <span style={errorText}>{errors.agreementDate}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Pincode Bill Card?</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.pincodeBillCard}
                                    onChange={(e) => handleInputChange('pincodeBillCard', e.target.value)}
                                    placeholder="Enter pincode bill card"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Product Category*</label>
                                <select
                                    style={{...input, ...(errors.productCategory ? inputError : {})}}
                                    value={formData.productCategory}
                                    onChange={(e) => handleInputChange('productCategory', e.target.value)}
                                >
                                    <option value="">Select product category</option>
                                    <option value="category1">Category 1</option>
                                    <option value="category2">Category 2</option>
                                    <option value="category3">Category 3</option>
                                </select>
                                {errors.productCategory && <span style={errorText}>{errors.productCategory}</span>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={column}>
                            <div style={formGroup}>
                                <label style={label}>Middle Name</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.middleName}
                                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                                    placeholder="Enter middle name"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>First Name*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.firstName ? inputError : {})}}
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    placeholder="Enter first name"
                                />
                                {errors.firstName && <span style={errorText}>{errors.firstName}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Last Name*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.lastName ? inputError : {})}}
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && <span style={errorText}>{errors.lastName}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Mobile Number*</label>
                                <input
                                    type="tel"
                                    style={{...input, ...(errors.mobileNumber ? inputError : {})}}
                                    value={formData.mobileNumber}
                                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                    placeholder="Enter mobile number"
                                />
                                {errors.mobileNumber && <span style={errorText}>{errors.mobileNumber}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Alternate Number</label>
                                <input
                                    type="tel"
                                    style={input}
                                    value={formData.alternateNumber}
                                    onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
                                    placeholder="Enter alternate number"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Country*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.country ? inputError : {})}}
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    placeholder="India"
                                />
                                {errors.country && <span style={errorText}>{errors.country}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>State*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.state ? inputError : {})}}
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="Enter state"
                                />
                                {errors.state && <span style={errorText}>{errors.state}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>City*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.city ? inputError : {})}}
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter city"
                                />
                                {errors.city && <span style={errorText}>{errors.city}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>GST Number*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.gstNumber ? inputError : {})}}
                                    value={formData.gstNumber}
                                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                                    placeholder="Enter GST number"
                                />
                                {errors.gstNumber && <span style={errorText}>{errors.gstNumber}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Telephone Number*</label>
                                <div style={telephoneGroup}>
                                    <input
                                        type="tel"
                                        style={{...input, ...(errors.telephoneNumber ? inputError : {}), ...telephoneInput}}
                                        value={formData.telephoneNumber}
                                        onChange={(e) => handleInputChange('telephoneNumber', e.target.value)}
                                        placeholder="Enter telephone number"
                                    />
                                    <button style={telephoneBtn}>
                                        <Phone size={16} />
                                    </button>
                                </div>
                                {errors.telephoneNumber && <span style={errorText}>{errors.telephoneNumber}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Number of Staff*</label>
                                <input
                                    type="number"
                                    style={input}
                                    value={formData.numberOfStaff}
                                    onChange={(e) => handleInputChange('numberOfStaff', e.target.value)}
                                    placeholder="Enter number of staff"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Agreement To Whom?</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.agreementToWhom}
                                    onChange={(e) => handleInputChange('agreementToWhom', e.target.value)}
                                    placeholder="Enter agreement to whom"
                                />
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Incorporation Address Line 1*</label>
                                <input
                                    type="text"
                                    style={{...input, ...(errors.incorporationAddressLine1 ? inputError : {})}}
                                    value={formData.incorporationAddressLine1}
                                    onChange={(e) => handleInputChange('incorporationAddressLine1', e.target.value)}
                                    placeholder="Enter incorporation address line 1"
                                />
                                {errors.incorporationAddressLine1 && <span style={errorText}>{errors.incorporationAddressLine1}</span>}
                            </div>

                            <div style={formGroup}>
                                <label style={label}>Incorporation Address Line 2</label>
                                <input
                                    type="text"
                                    style={input}
                                    value={formData.incorporationAddressLine2}
                                    onChange={(e) => handleInputChange('incorporationAddressLine2', e.target.value)}
                                    placeholder="Enter incorporation address line 2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div style={uploadSection}>
                        <div style={uploadGroup}>
                            <label style={uploadLabel}>Aadhar Card (jpg/pdf)</label>
                            <div style={uploadArea}>
                                <Upload size={24} style={uploadIcon} />
                                <span style={uploadText}>
                                    {formData.aadharCard ? formData.aadharCard.name : 'Upload...'}
                                </span>
                                <input
                                    type="file"
                                    style={fileInput}
                                    accept=".jpg,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange('aadharCard', e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div style={uploadGroup}>
                            <label style={uploadLabel}>First Page Of Agreement (pdf/jpg)</label>
                            <div style={uploadArea}>
                                <Upload size={24} style={uploadIcon} />
                                <span style={uploadText}>
                                    {formData.firstPageOfAgreement ? formData.firstPageOfAgreement.name : 'Upload...'}
                                </span>
                                <input
                                    type="file"
                                    style={fileInput}
                                    accept=".jpg,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange('firstPageOfAgreement', e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div style={uploadGroup}>
                            <label style={uploadLabel}>Business Proposal (pdf/jpg)</label>
                            <div style={uploadArea}>
                                <Upload size={24} style={uploadIcon} />
                                <span style={uploadText}>
                                    {formData.businessProposal ? formData.businessProposal.name : 'Upload...'}
                                </span>
                                <input
                                    type="file"
                                    style={fileInput}
                                    accept=".jpg,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange('businessProposal', e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Consent Section */}
                    <div style={consentSection}>
                        <div style={consentGroup}>
                            <input
                                type="checkbox"
                                style={checkbox}
                                checked={formData.consent}
                                onChange={(e) => handleInputChange('consent', e.target.checked)}
                            />
                            <label style={consentText}>
                                By clicking, you hereby confirm that you are at least 18 years old and have read and understood our terms and conditions of our services...
                            </label>
                        </div>
                        {errors.consent && <span style={errorText}>{errors.consent}</span>}
                    </div>
                </div>

                {/* Footer */}
                <div style={modalFooter}>
                    <button onClick={handleErase} style={eraseBtn}>
                        Erase
                    </button>
                    <button onClick={handleSave} style={saveBtn}>
                        Save
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
    width: '95%',
    maxWidth: '1200px',
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

const modalTitle = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a202c',
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

const formContainer = {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
};

const formGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
};

const column = {
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
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
};

const input = {
    padding: '10px 12px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
};

const inputError = {
    borderColor: '#e53e3e',
};

const errorText = {
    fontSize: '0.75rem',
    color: '#e53e3e',
    marginTop: '2px',
};

const telephoneGroup = {
    display: 'flex',
    gap: '8px',
};

const telephoneInput = {
    flex: 1,
};

const telephoneBtn = {
    padding: '10px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    backgroundColor: '#f7fafc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const uploadSection = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
};

const uploadGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const uploadLabel = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
};

const uploadArea = {
    position: 'relative',
    border: '2px dashed #cbd5e0',
    borderRadius: '6px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
};

const uploadIcon = {
    color: '#a0aec0',
};

const uploadText = {
    fontSize: '0.875rem',
    color: '#718096',
};

const fileInput = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
};

const consentSection = {
    marginBottom: '24px',
};

const consentGroup = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
};

const checkbox = {
    marginTop: '4px',
};

const consentText = {
    fontSize: '0.875rem',
    color: '#4a5568',
    lineHeight: '1.5',
};

const modalFooter = {
    padding: '24px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#f8fafc',
};

const eraseBtn = {
    backgroundColor: '#718096',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

const saveBtn = {
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

export default CreateCBCUserForm;
