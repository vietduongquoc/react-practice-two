import { emailPattern, validTlds, passwordPattern } from '../constants/regex';

export const validateName = (name) => {
    return name.length >= 6;
};

export const validateEmail = (email) => {
    if (!emailPattern.test(email)) return false;
    const domain = email.split('.').pop();
    return validTlds.includes(domain);
};

export const validatePassword = (password) => {
    return passwordPattern.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const validateForm = (fields) => {
    const { name, email, password, confirmPassword } = fields;

    const nameError = name !== undefined ? (validateName(name) ? '' : 'Name must have a minimum of 6 characters') : '';
    const emailError = email !== undefined ? (validateEmail(email) ? '' : 'Email must be in correct format') : '';
    const passwordError = password !== undefined ? (validatePassword(password) ? '' : 'Password must have a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol') : '';
    const confirmPasswordError = confirmPassword !== undefined ? (validateConfirmPassword(password, confirmPassword) ? '' : 'Passwords do not match') : '';

    return {
        errors: {
            name: name ? nameError : '',
            email: email ? emailError : '',
            password: password ? passwordError : '',
            confirmPassword: confirmPassword ? confirmPasswordError : '',
        },
        isFormValid: !nameError && !emailError && !passwordError && !confirmPasswordError,
    };
};
