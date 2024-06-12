import React from 'react';
import './index.css'
import logo from '../../assets/image/Logo.jpg'

const Image = () => {
    return (
        <div>
            <img className='logo' src={logo} alt="Logo" />
        </div>
    );
}

export default Image;