import React from 'react';
import SearchBar from '../SearchBar';
import UserMenu from '../UserMenu';

const Header = ({ setFilteredBooks, books }) => {
    return (
        <header className="header-container">
            <SearchBar setFilteredBooks={setFilteredBooks} books={books} />
            <UserMenu />
        </header>
    );
};

export default Header;
