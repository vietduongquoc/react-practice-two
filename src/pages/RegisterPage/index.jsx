import React, { useState, useEffect } from 'react';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';
import { registerUser } from '../../services/userService';
import { validateForm } from '../../utils/validation';
import logoIcon from '../../assets/images/icon-logo.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

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

    useEffect(() => {
        const { errors, isFormValid } = validateForm({ name, email, password, confirmPassword });
        setErrors(errors);
        setIsFormValid(isFormValid);
    }, [name, email, password, confirmPassword]);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            showLoading();
            try {
                await registerUser(name, email, password);
                addToast('Registration successful!', 'success');
                navigate('/');
            } catch (error) {
                addToast('Registration failed: ' + error, 'error');
            } finally {
                hideLoading();
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
                    <img src={logoIcon} alt="Logo" className="Logo-icon" />
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
                    required={true}
                    placeholder="Username"
                    errorMessage={errors.name}
                />
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required={true}
                    placeholder="Username@mail.com"
                    errorMessage={errors.email}
                />
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required={true}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Password"
                    errorMessage={errors.password}
                />
                <Input
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required={true}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Confirm Password"
                    errorMessage={errors.confirmPassword}
                />
                <div className="actions-register">
                    <Button
                        type="submit"
                        color="btn-primary"
                        borderRadius="btn-rounded"
                        size="btn-large"
                        text="Register"
                        isDisabled={!isFormValid || isSubmitting}
                    />
                    <div className='wrap-link-register'>
                        <span className='text-register'>Already a User?</span>
                        <span className='link-register' onClick={handleLoginClick}>Login Now</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
