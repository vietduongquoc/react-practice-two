import React, { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';

const FormRegister = ({ onSubmit, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                return value.length >= 6 ? '' : 'Name must have a minimum of 6 characters';
            case 'email':
                return validateEmail(value) ? '' : 'Email must be in correct format';
            case 'password':
                return validatePassword(value) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
            case 'confirmPassword':
                return password === value ? '' : 'Passwords do not match';
            default:
                return '';
        }
    };

    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                setErrors((prevErrors) => ({ ...prevErrors, name: validateField(fieldName, value) }));
                break;
            case 'email':
                setEmail(value);
                setErrors((prevErrors) => ({ ...prevErrors, email: validateField(fieldName, value) }));
                break;
            case 'password':
                setPassword(value);
                setErrors((prevErrors) => ({ ...prevErrors, password: validateField(fieldName, value) }));
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: validateField(fieldName, value) }));
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const nameError = validateField('name', name);
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);
        const confirmPasswordError = validateField('confirmPassword', confirmPassword);

        setIsFormValid(
            nameError === '' &&
            emailError === '' &&
            passwordError === '' &&
            confirmPasswordError === ''
        );
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            // Simulating successful registration
            alert('Registration successful!');
            onSubmit({ name, email, password });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, name: validateField('name', name) }))}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, email: validateField('email', email) }))}
                required={true}
                placeholder="username@mail.com"
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, password: validateField('password', password) }))}
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
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: validateField('confirmPassword', confirmPassword) }))}
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
                    isDisabled={!isFormValid}
                />
                <div className='wrap-link-register'>
                    <span className='text-register'> Already a User?</span>
                    <span className='link-register' onClick={onLoginClick}>Login Now</span>
                </div>
            </div>
        </form>
    );
};

export default FormRegister;
