import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import logoIcon from '../../assets/image/Logo.jpg';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import { fetchUsers } from '../../services/servicesUser';
import { validateForm } from '../../utils/validation';
import { useToast } from '../../components/Toast/ToastManager';
import { useLoading } from '../../components/Loading/LoadingContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addToast = useToast();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate(); // Initialize useNavigate

    const validateAllFields = useCallback(() => {
        const { errors, isFormValid } = validateForm({ email, password });
        setErrors(errors);
        setIsFormValid(isFormValid);
    }, [email, password]);

    useEffect(() => {
        validateAllFields();
    }, [email, password, validateAllFields]);

    const handleChange = (field, value) => {
        if (field === 'email') {
            setEmail(value);
        } else if (field === 'password') {
            setPassword(value);
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
            const result = await fetchUsers();
            setIsSubmitting(false);
            hideLoading();

            if (result.error) {
                addToast('Error fetching users: ' + result.error, 'error');
                return;
            }

            const users = result.data;
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                addToast('Login successful!', 'success');
                console.log({ email, password, remember });
                navigate('/home-page'); // Redirect to HomePage
            } else {
                addToast('Login failed: Incorrect email or password', 'error');
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
                    <h1 className='login-form-title'>Welcome Back!</h1>
                    <p className='login-form-ders'>Sign in to continue to your Digital Library</p>
                </div>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
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
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    required={true}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Password"
                />
                {errors.password && <div className="error">{errors.password}</div>}
                <Checkbox
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    label="Remember me"
                />
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
                        <span className='text-login'>New User?</span>
                        <a className='link-login' href="/register">Register Here</a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;