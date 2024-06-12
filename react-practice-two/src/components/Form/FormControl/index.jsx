import React, { useState } from 'react';
import './index.css';
// import { FaSearch } from 'react-icons/fa';

const FormControl = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchType, setSearchType] = useState('Title');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setDropdownOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching for ${searchType}: ${searchQuery}`);
    };

    return (
        <div className="form-control">
            <div className="dropdown">
                <button className="dropdown-btn" onClick={toggleDropdown}>
                    {searchType} ▼
                </button>
                {dropdownOpen && (
                    <ul className="dropdown-menu">
                        <li onClick={() => handleSearchTypeChange('Title')}>Title</li>
                        <li onClick={() => handleSearchTypeChange('Author')}>Author</li>
                    </ul>
                )}
            </div>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchType.toLowerCase()}...`}
                />
                <button type="submit" className="search-btn">
                    {/* <FaSearch color="#fa7c54" /> */}
                </button>
            </form>
        </div>
    );
};

export default FormControl;
