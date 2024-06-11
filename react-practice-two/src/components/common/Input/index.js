import React from 'react';
import './index.css';
import '../../../assets/image/eye-closed.jpg'
import '../../../assets/image/eye-open.jpg'

const eyeClosed = '../../../assets/image/eye-closed.jpg'
const eyeOpen = '../../../assets/image/eye-open.jpg'

const Input = ({ label, type, value, onChange, id, name, required, showPassword, placeholder, togglePasswordVisibility }) => {
    return (
        <div className={`input-group ${type === 'password' ? 'password-toggle' : ''}`}>
            <label className='lable-input' htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                />
                {type === 'password' && (
                    <span className="toggle" onClick={togglePasswordVisibility}>
                        <img src={showPassword ? eyeOpen : eyeClosed} alt=''/>
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
