import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logoIcon from '../../assets/image/Logo.jpg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { fetchUsers } from '../../services/servicesUser';
import { validateForm } from '../../utils/validation';
import { useToast } from '../../components/Toast/ToastManager';
import { useLoading } from '../../components/Loading/LoadingContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addToast = useToast();
    const { showLoading, hideLoading } = useLoading();

    const validateAllFields = useCallback(() => {
        const { errors, isFormValid } = validateForm({ name, email, password, confirmPassword });
        setErrors(errors);
        setIsFormValid(isFormValid);
    }, [name, email, password, confirmPassword]);

    useEffect(() => {
        validateAllFields();
    }, [name, email, password, confirmPassword, validateAllFields]);

    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
        validateAllFields();
    };

    const handleBlur = (field) => {
        validateAllFields();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            setIsSubmitting(true);
            showLoading();
            const result = await fetchUsers(); // Calling fetchUsers service to get all users
            setIsSubmitting(false);
            hideLoading();

            if (result.error) {
                addToast('Error fetching users: ' + result.error, 'error');
                return;
            }

            const users = result.data;
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                addToast('Registration failed: Email already in use', 'error');
            } else {
                addToast('Registration successful!', 'success');
                console.log({ name, email, password });
                // After successful registration, redirect to home page
                navigate('/home-page');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className='wrap-register-form-title'>
                    <img src={logoIcon} alt="Logo" className="logo-icon" />
                    <h1 className='register-form-title'>Registration</h1>
                    <p className='register-form-ders'>For Both Staff & Students</p>
                </div>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    required={true}
                    placeholder="Username"
                />
                {errors.name && <div className="error">{errors.name}</div>}
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    required={true}
                    placeholder="Username@mail.com"
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    required={true}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Password"
                />
                {errors.password && <div className="error">{errors.password}</div>}
                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required={true}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Confirm Password"
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                <div className="actions-register">
                    <Button
                        type="submit"
                        color="btn-primary"
                        borderRadius="btn-rounded"
                        size="btn-large"
                        text="Register"
                        onClick={handleSubmit}
                        isDisabled={!isFormValid || isSubmitting}
                    />
                    <div className='wrap-link-register'>
                        <span className='text-register'> Already a User?</span>
                        <span className='link-register' onClick={handleLoginClick}>Login Now</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
