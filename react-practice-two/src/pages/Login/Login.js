// Login.js
import React from 'react';
import './Login.css';
import Image from '../../layouts/Logo';
import FormSubmit from '../../components/common/Form/FormSubmit';

const Login = () => {
    const handleFormSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
    };

    return (
        <div className="form-container">
            <form className="login-form">
                <div className='wrap-login-form-title'>
                    <Image />
                    <h2 className='login-form-title'>Welcome Back !</h2>
                    <span className='login-form-ders'>Sign in to continue to yourDigital Library</span>
                </div>
                <FormSubmit onSubmit={handleFormSubmit} />
            </form>
        </div>
    );
};

export default Login;
