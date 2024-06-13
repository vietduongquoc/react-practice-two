import React, { useState } from 'react';
import Input from '../../common/Input/index'
import Button from '../../common/Button/index'
import './index.css'

const FormRegister = ({ onSubmit, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        onSubmit({ name, email, password });
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
                placeholder="password"
            />
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
                placeholder="confirm password"
            />
            <div className="actions-register">
                <Button
                    type="submit"
                    color="btn-primary"
                    borderRadius="btn-rounded"
                    size="btn-large"
                    text="Register"
                    onClick={handleSubmit}
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
