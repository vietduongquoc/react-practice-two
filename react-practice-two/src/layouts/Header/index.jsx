import React from 'react';
import './index.css';
import FormControl from '../FormControl';
import UserMenu from '../UserMenu';

const Header = ({ setFilteredBooks, books }) => {
    return (
        <header className="header">
            <div className="header-container">
                <FormControl setFilteredBooks={setFilteredBooks} books={books} />
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;

