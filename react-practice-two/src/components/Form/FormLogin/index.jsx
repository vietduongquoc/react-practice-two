import React, { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';  // Make sure to import your CSS file here

const FormSubmit = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, remember });
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
                placeholder="email"
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
