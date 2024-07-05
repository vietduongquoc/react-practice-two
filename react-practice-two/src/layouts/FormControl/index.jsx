import searchIcon from '../../assets/image/icon-search-color.jpg';
import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const FormControl = ({ setFilteredBooks, books }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchType, setSearchType] = useState('Title');
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setDropdownOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = books.filter(book =>
            searchType === 'Title'
                ? book.name.toLowerCase().includes(lowerCaseQuery)
                : book.author.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredBooks(filtered);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="form-control">
            <div className="dropdown-form-control" ref={dropdownRef}>
                <button className="dropdown-btn-form-control" onClick={toggleDropdown}>
                    {searchType} {dropdownOpen ? '▲' : '▼'}
                </button>
                {dropdownOpen && (
                    <ul className="dropdown-menu-form-control">
                        <li
                            className='dropdown-menu-type'
                            onClick={() => handleSearchTypeChange('Title')}
                        >
                            Title
                        </li>
                        <li
                            className='dropdown-menu-type'
                            onClick={() => handleSearchTypeChange('Author')}
                        >
                            Author
                        </li>
                    </ul>
                )}
            </div>
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
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
