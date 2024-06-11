// Login.js
import React from 'react';
import './Login.css';
import FormSubmit from '../../components/common/Form/FormSubmit';

const Login = () => {
    const handleFormSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <FormSubmit onSubmit={handleFormSubmit} />
        </div>
    );
};

export default Login;
