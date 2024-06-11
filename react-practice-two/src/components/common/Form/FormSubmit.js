import React, { useState } from 'react';
import Input from '../Input';

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
            />
            <div className="input-group checkbox">
                <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Remember Password</label>
            </div>
            <div className="actions">
                <button type="submit">Login</button>
                <a href="/register">New User? Register Here</a>
            </div>
        </form>
    );
};

export default FormSubmit;