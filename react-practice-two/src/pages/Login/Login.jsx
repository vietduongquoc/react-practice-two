// Login.js
import React from 'react';
import './Login.css';
import logoIcon from '../../assets/image/Logo.jpg';
import FormSubmit from '../../components/Form/FormLogin';

const Login = () => {
    const handleFormSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
    };

    return (
        <div className="form-container">
            <form className="login-form">
                <div className='wrap-login-form-title'>
                    <img src={logoIcon} alt="Logo" className="logo-icon" />
                    <h1 className='login-form-title'>Welcome Back !</h1>
                    <p className='login-form-ders'>Sign in to continue to yourDigital Library</p>
                </div>
                <FormSubmit onSubmit={handleFormSubmit} />
            </form>
        </div>
    );
};

export default Login;
