import React from 'react';
import './index.css';
import FormControl from '../../components/Form/FormControl';
import UserMenu from '../UserMenu';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <FormControl />
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
