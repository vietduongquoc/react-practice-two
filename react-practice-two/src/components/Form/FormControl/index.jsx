import React, { useState } from 'react';
import './index.css';
import searchIcon from '../../../assets/image/icon-search-color.jpg';

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
            <div className="dropdown-form-control">
                <button className="dropdown-btn-form-control" onClick={toggleDropdown}>
                    {searchType} ▼
                </button>
                {dropdownOpen && (
                    <ul className="dropdown-menu-form-control">
                        <li className='dropdown-menu-type' onClick={() => handleSearchTypeChange('Title')}>Title</li>
                        <li className='dropdown-menu-type' onClick={() => handleSearchTypeChange('Author')}>Author</li>
                    </ul>
                )}
            </div>
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${searchType.toLowerCase()}...`}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">
                        <img
                            src={searchIcon} alt='Search Icon' className='search-icon'
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormControl;