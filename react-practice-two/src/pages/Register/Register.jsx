import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logoIcon from '../../assets/image/Logo.jpg'
import FormRegister from '../../components/Form/FormRegister';

const Register = () => {
    const navigate = useNavigate();

    const handleFormRegister = (data) => {
        // Handle form submission logic here
        console.log(data);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <div className="form-container">
            <form className="register-form">
                <div className='wrap-register-form-title'>
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                    <h1 className='register-form-title'>Registration</h1>
                    <p className='register-form-ders'>For Both Staff & Students</p>
                </div>
                <FormRegister onSubmit={handleFormRegister} onLoginClick={handleLoginClick} />
            </form>
        </div >
    );
};

export default Register;
