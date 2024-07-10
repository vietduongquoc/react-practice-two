import eyeClosed from '../../assets/image/eyeClosed.jpg'
import eyeOpen from '../../assets/image/eyeOpen.jpg'
import React, { memo } from 'react';
import './index.css';

const Input = ({
    className,
    label,
    type,
    value,
    onChange,
    id,
    name,
    required,
    showPassword,
    placeholder,
    togglePasswordVisibility,
    onBlur }) => {
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
                    onBlur={onBlur}
                    className={className}
                />
                {type === 'password' && (
                    <span className="toggle" onClick={togglePasswordVisibility}>
                        <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
                    </span>
                )}
            </div>
        </div>
    );
};

export default memo(Input);
