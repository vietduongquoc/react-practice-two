import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email, password, remember });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group password-toggle">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
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
        </div>
    );
};

export default Login;