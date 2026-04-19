import React from 'react';
import { useNavigate } from 'react-router';
import CreateCBCUserForm from './CreateCBCUserForm';

const CreateCBCUserPage = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/user-management/user-request');
    };

    return (
        <CreateCBCUserForm 
            isOpen={true} 
            onClose={handleClose}
        />
    );
};

export default CreateCBCUserPage;
