import React, { useState, useEffect } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';

const FormSubmit = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const emailError = validateEmail(email) ? '' : 'Email must be in correct format';
        const passwordError = validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
        setErrors({ email: emailError, password: passwordError });

        setIsFormValid(
            email !== '' &&
            password !== '' &&
            emailError === '' &&
            passwordError === ''
        );
    }, [email, password]);

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
            onSubmit({ email, password, remember });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                placeholder="Email"
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
            <div className="input-group checkbox">
                <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label className='label-remember' htmlFor="remember">Remember me</label>
            </div>
            <div className="actions">
                <Button
                    type="submit"
                    className="submit-btn"
                    onClick={handleSubmit}
                    text="Login"
                    color="btn-primary"
                    borderRadius="btn-rounded"
                    size="btn-large"
                    isDisabled={!isFormValid}
                />
                <div className='wrap-link-login'>
                    <span className='text-login'> New User? </span>
                    <a className='link-login' href="/register">Register Here</a>
                </div>
            </div>
        </form>
    );
};

export default FormSubmit;