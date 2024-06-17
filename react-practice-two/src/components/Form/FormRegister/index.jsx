import React, { useState, useEffect } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';
import { emailPattern, passwordPattern } from '../../../constants/regex';
import { fetchUsers } from '../../../services/servicesUser';

const FormRegister = ({ onSubmit, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const nameError = validateName(name) ? '' : 'Name must have a minimum of 6 characters';
        const emailError = validateEmail(email) ? '' : 'Email must be in correct format';
        const passwordError = validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
        const confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';

        setErrors({
            name: name ? nameError : '',
            email: email ? emailError : '',
            password: password ? passwordError : '',
            confirmPassword: confirmPassword ? confirmPasswordError : '',
        });

        setIsFormValid(
            !nameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            name !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== ''
        );
    }, [name, email, password, confirmPassword]);

    const validateName = (name) => {
        return name.length >= 6;
    };

    const validateEmail = (email) => {
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        return passwordPattern.test(password);
    };

    const handleValidate = (field) => {
        if (field === 'name') {
            const nameError = validateName(name) ? '' : 'Name must have a minimum of 6 characters';
            setErrors((prevErrors) => ({ ...prevErrors, name: nameError }));
        } else if (field === 'email') {
            const emailError = validateEmail(email) ? '' : 'Email must be in correct format';
            setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
        } else if (field === 'password') {
            const passwordError = validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
        } else if (field === 'confirmPassword') {
            const confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            setIsSubmitting(true);
            const result = await fetchUsers(); // Calling fetchUsers service to get all users
            setIsSubmitting(false);

            if (result.error) {
                alert('Error fetching users: ' + result.error);
                return;
            }

            const users = result.data;
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('Registration failed: Email already in use');
            } else {
                alert('Registration successful!');
                onSubmit({ name, email, password });
            }
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
                onChange={(e) => {
                    setName(e.target.value);
                    handleValidate('name');
                }}
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
                onChange={(e) => {
                    setEmail(e.target.value);
                    handleValidate('email');
                }}
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
                onChange={(e) => {
                    setPassword(e.target.value);
                    handleValidate('password');
                }}
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
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleValidate('confirmPassword');
                }}
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
                    <span className='link-register' onClick={onLoginClick}>Login Now</span>
                </div>
            </div>
        </form>
    );
};

export default FormRegister;
