import { useLoading } from './LoadingProvider';
import React from 'react';
import './Loading.css';

const Loading = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default Loading;
