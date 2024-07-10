import { useLoading } from '../../components/Spinner/LoadingProvider';
import { useToast } from '../../components/Toast/ToastProvider';
import React, { useState, useEffect, useCallback } from 'react';
import { loginUser, logoutUser } from '../../services/servicesUser';
import { validateForm } from '../../utils/validation';
import logoIcon from '../../assets/image/Logo.jpg';
import Checkbox from '../../components/Checkbox';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getToken } from '../../services/servicesUser';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [remember, setRemember] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [isFormValid, setIsFormValid] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const addToast = useToast();
//     const { showLoading, hideLoading } = useLoading();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check sessionStorage for saved credentials if Remember Me was not selected
//         const savedEmail = sessionStorage.getItem('savedEmail');
//         const savedPassword = sessionStorage.getItem('savedPassword');
//         if (savedEmail && savedPassword) {
//             setEmail(savedEmail);
//             setPassword(savedPassword);
//         }
        
//         // Handle logout when closing tab or browser
//         const handleUnload = () => {
//             if (!remember) {
//                  // Logout if Remember Me is not checked
//                 logoutUser();
//             }
//         };
//         window.addEventListener('beforeunload', handleUnload);
//         return () => {
//             window.removeEventListener('beforeunload', handleUnload);
//         };
//     }, [remember]);

//     const validateAllFields = useCallback(() => {
//         const { errors, isFormValid } = validateForm({ email, password });
//         setErrors(errors);
//         setIsFormValid(isFormValid);
//     }, [email, password]);

//     useEffect(() => {
//         validateAllFields();
//     }, [email, password, validateAllFields]);

//     const handleChange = (field, value) => {
//         if (field === 'email') {
//             setEmail(value);
//         } else if (field === 'password') {
//             setPassword(value);
//         }
//         validateAllFields();
//     };

//     const handleBlur = () => {
//         validateAllFields();
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!isFormValid) return;

//         setIsSubmitting(true);
//         showLoading();

//         try {
//             const { data } = await loginUser(email, password, remember);
//             const { custom_attributes } = data;
//             const { username } = custom_attributes || {};

//             if (remember) {
//                 localStorage.setItem('rememberMe', 'true');
//                 localStorage.setItem('savedEmail', email);
//                 localStorage.setItem('savedPassword', password);
//                 localStorage.setItem('username', username || 'username');
//             } else {
//                 sessionStorage.setItem('savedEmail', email);
//                 sessionStorage.setItem('savedPassword', password);
//                 sessionStorage.setItem('username', username || 'username');
//             }

//             addToast('Login successful!', 'success');
//             navigate('/');
//         } catch (error) {
//             addToast('Login failed! Please check your email and password again!', 'error');
//         } finally {
//             setIsSubmitting(false);
//             hideLoading();
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="form-container">
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <div className='wrap-login-form-title'>
//                     <img src={logoIcon} alt="Logo" className="Logo-icon" />
//                     <h1 className='login-form-title'>Welcome Back!</h1>
//                     <p className='login-form-ders'>Sign in to continue to your Digital Library</p>
//                 </div>
//                 <Input
//                     label="Email"
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => handleChange('email', e.target.value)}
//                     onBlur={() => handleBlur('email')}
//                     required={true}
//                     placeholder="Email"
//                 />
//                 {errors.email && <div className="error">{errors.email}</div>}
//                 <Input
//                     label="Password"
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={password}
//                     onChange={(e) => handleChange('password', e.target.value)}
//                     onBlur={() => handleBlur('password')}
//                     required={true}
//                     showPassword={showPassword}
//                     togglePasswordVisibility={togglePasswordVisibility}
//                     placeholder="Password"
//                 />
//                 {errors.password && <div className="error">{errors.password}</div>}
//                 <Checkbox
//                     id="remember"
//                     name="remember"
//                     checked={remember}
//                     onChange={(e) => setRemember(e.target.checked)}
//                     label="Remember me"
//                 />
//                 <div className="actions">
//                     <Button
//                         onClick={handleSubmit}
//                         type="submit"
//                         className="submit-btn"
//                         text="Login"
//                         color="btn-primary"
//                         borderRadius="btn-rounded"
//                         size="btn-large"
//                         isDisabled={!isFormValid || isSubmitting}
//                     />
//                     <div className='wrap-link-login'>
//                         <span className='text-login'>New User?</span>
//                         <a className='link-login' href="/register">Register Here</a>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default LoginPage;


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
        // Check sessionStorage for saved credentials if Remember Me was not selected
        const savedEmail = sessionStorage.getItem('savedEmail');
        const savedPassword = sessionStorage.getItem('savedPassword');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
        }

        // Check localStorage for saved credentials if Remember Me was selected
        const savedEmailLocal = localStorage.getItem('savedEmail');
        const savedPasswordLocal = localStorage.getItem('savedPassword');
        const savedRememberMe = localStorage.getItem('rememberMe');
        // const savedUsername = localStorage.getItem('username');
        
        if (savedRememberMe === 'true' && savedEmailLocal && savedPasswordLocal) {
            setEmail(savedEmailLocal);
            setPassword(savedPasswordLocal);
            setRemember(true);
        }

        // Handle logout when closing tab or browser
        const handleUnload = () => {
            if (!remember) {
                logoutUser();
            }
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [remember]);

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

    const handleBlur = () => {
        validateAllFields();
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
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', password);
                localStorage.setItem('username', username || 'username');
            } else {
                sessionStorage.setItem('savedEmail', email);
                sessionStorage.setItem('savedPassword', password);
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

    // Redirect to HomePage if user is already logged in
    const token = getToken();
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

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
                    onBlur={() => handleBlur('email')}
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