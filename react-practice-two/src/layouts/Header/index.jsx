import FormControl from '../FormControl';
import UserMenu from '../UserMenu';
import React from 'react';

const Header = ({ setFilteredBooks, books }) => {
    return (
        <header className="header-container">
            <FormControl setFilteredBooks={setFilteredBooks} books={books} />
            <UserMenu />
        </header>
    );
};

export default Header;