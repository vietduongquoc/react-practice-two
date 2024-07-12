import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';
import React, { useState, useEffect, useCallback } from 'react';
import { loginUser, getToken } from '../../services/userService';
import { validateForm } from '../../utils/validation';
import logoIcon from '../../assets/images/icon-logo.jpg';
import Checkbox from '../../components/Checkbox';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
    const navigate = useNavigate();

    useEffect(() => {
        validateFields();
    }, [email, password]);

    const validateFields = () => {
        const { errors, isFormValid } = validateForm({ email, password });
        setErrors(errors);
        setIsFormValid(isFormValid);
    };

    // Redirect to HomePage if user is already logged in
    const token = getToken();
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);

    const handleBlur = () => {
        validateFields();
    };

    const handleChange = (field, value) => {
        if (field === 'email') {
            setEmail(value);
        } else if (field === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        showLoading();

        try {
            const { data } = await loginUser(email, password, remember);
            const { custom_attributes } = data;
            const { username } = custom_attributes || {};

            if (remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('username', username || 'username');
            } else {
                sessionStorage.setItem('username', username || 'username');
            }

            addToast('Login successful!', 'success');
            navigate('/');
        } catch (error) {
            addToast('Login failed! Please check your email and password again!', 'error');
        } finally {
            setIsSubmitting(false);
            hideLoading();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className='wrap-login-form-title'>
                    <img src={logoIcon} alt="Logo" className="Logo-icon" />
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
                    onBlur={handleBlur}
                    required={true}
                    placeholder="Email"
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={handleBlur}
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