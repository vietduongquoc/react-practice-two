import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Image from '../../layouts/Logo';
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
                    <Image />
                    <h2 className='register-form-title'>Registration</h2>
                    <span className='register-form-ders'>For Both Staff & Students</span>
                </div>
                <FormRegister onSubmit={handleFormRegister} onLoginClick={handleLoginClick} />
            </form>
        </div >
    );
};

export default Register;
