import React from 'react';
import './index.css';
import FormControl from '../FormControl';
import UserMenu from '../UserMenu';

const Header = ({ setFilteredBooks, books }) => {
    return (
        <header className="header-container">
            <FormControl setFilteredBooks={setFilteredBooks} books={books} />
            <UserMenu />
        </header>
    );
};

export default Header;