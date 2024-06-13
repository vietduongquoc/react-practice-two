import React, { useState, useEffect } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';

const FormRegister = ({ onSubmit, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const nameError = validateName(name) ? '' : 'Password must have a minimum of 8 characters';
        const emailError = validateEmail(email) ? '' : 'Email must be in correct format';
        const passwordError = validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
        const confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
        setErrors({ name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });

        setIsFormValid(
            name !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            emailError === '' &&
            passwordError === '' &&
            confirmPasswordError === ''
        );
    }, [name, email, password, confirmPassword]);

    const validateName = (name) => {
        const namePattern = /^(?=.*[a-z]){8,}$/;
        return namePattern.test(name);
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
