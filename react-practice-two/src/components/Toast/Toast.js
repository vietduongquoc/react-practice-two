import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return <div className={`toast ${type}`}>{message}</div>;
};

export default Toast;
