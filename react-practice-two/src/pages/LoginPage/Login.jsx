import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import logoIcon from '../../assets/image/Logo.jpg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/FormCheckbox';
import { validateForm } from '../../utils/validation';
import { useToast } from '../../components/Toast/ToastProvider';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import { loginUser } from '../../services/servicesUser';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false); // State for Remember me checkbox
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addToast = useToast();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for Remember me status and populate email/password if checked
        const rememberMeStatus = localStorage.getItem('rememberMe');
        if (rememberMeStatus === 'true') {
            const savedEmail = localStorage.getItem('savedEmail');
            const savedPassword = localStorage.getItem('savedPassword');
            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRemember(true);
            }
        }
    }, []);

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (isFormValid) {
    //             setIsSubmitting(true);
    //             showLoading();

    //             const { data } = await loginUser(email, password);
    //             const { username } = data;
    //             setIsSubmitting(false);
    //             hideLoading();

    //             localStorage.setItem('username', username || 'username')
    //             addToast('Login successful!', 'success');
    //             if (remember) {
    //                 localStorage.setItem('rememberMe', 'true');
    //                 localStorage.setItem('savedEmail', email);
    //                 localStorage.setItem('savedPassword', password);
    //             } else {
    //                 localStorage.removeItem('rememberMe');
    //                 localStorage.removeItem('savedEmail');
    //                 localStorage.removeItem('savedPassword');
    //             }

    //             // Save token to localStorage
    //             localStorage.setItem('token', '483|7wGDX8MyvTRv1KkiMkUKPDF3PRbtpYNpKfFFdpi8');

    //             navigate('/home-page');
    //         }
    //     } catch (error) {
    //         addToast('Login failed: ' + error, 'error');
    //         return;
    //     }

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        showLoading();

        try {
            const { data, error } = await loginUser(email, password);
            if (error) {
                throw new Error(error);
            }

            const { username, token } = data;
            localStorage.setItem('username', username || 'username');
            localStorage.setItem('token', token);

            if (remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', password);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
            }

            addToast('Login successful!', 'success');
            navigate('/home-page');
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