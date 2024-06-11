import React from 'react';
import './index.css'

const Button = ({ color, type, borderRadius, size, isDisabled, text, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${size}`}
            style={{
                backgroundColor: color,
                borderRadius: borderRadius,
            }}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};

export default Button;
