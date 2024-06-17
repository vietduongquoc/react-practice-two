import React, { useState, useEffect } from 'react';
import './Login.css';
import logoIcon from '../../assets/image/Logo.jpg';
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { emailPattern, passwordPattern } from '../../constants/regex';
import { fetchUsers } from '../../services/servicesUser';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsFormValid(
            email !== '' &&
            password !== '' &&
            !errors.email &&
            !errors.password
        );
    }, [email, password, errors]);

    const validateEmail = (email) => {
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        return passwordPattern.test(password);
    };

    const handleValidate = (field) => {
        if (field === 'email') {
            const emailError = validateEmail(email) ? '' : 'Email must be in correct format';
            setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
        } else if (field === 'password') {
            const passwordError = validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol';
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
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
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login successful!');
                console.log({ email, password, remember });
            } else {
                alert('Login failed: Incorrect email or password');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className='wrap-login-form-title'>
                    <img src={logoIcon} alt="Logo" className="logo-icon" />
                    <h1 className='login-form-title'>Welcome Back !</h1>
                    <p className='login-form-ders'>Sign in to continue to your Digital Library</p>
                </div>
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
                    placeholder="Email"
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
                        onClick={handleSubmit}
                        type="submit"
                        className="submit-btn"
                        text="Login"
                        color="btn-primary"
                        borderRadius="btn-rounded"
                        size="btn-large"
                        isDisabled={!isFormValid || isSubmitting}
                    />
                    <div className='wrap-link-login'>
                        <span className='text-login'> New User? </span>
                        <a className='link-login' href="/register">Register Here</a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;