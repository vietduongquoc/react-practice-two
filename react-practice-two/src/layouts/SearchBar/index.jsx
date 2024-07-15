import { useToast } from '../../components/Toast/ToastProvider';
import searchIcon from '../../assets/images/icon-search.jpg';
import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SearchBar = ({ setFilteredBooks, books }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchType, setSearchType] = useState('Title');
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const addToast = useToast();

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

    const handleSearchQueryChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === '') {
            // Reset to all books when search query is cleared
            setFilteredBooks(books);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const lowerCaseQuery = searchQuery.toLowerCase();
        if (!books) {
            return;
        }

        const filtered = books.filter(book =>
            searchType === 'Title'
                ? book.name.toLowerCase().includes(lowerCaseQuery)
                : book.author.toLowerCase().includes(lowerCaseQuery)
        );
        if (filtered.length === 0) {
            addToast('Not Found', 'error');
        }

        setFilteredBooks(filtered);
    };

    return (
        <div className="form-control">
            <div ref={dropdownRef} className="form-control">
                <Button
                    className="dropdown-btn-form-control"
                    onClick={toggleDropdown}
                    text={`${searchType} ${dropdownOpen ? '▲' : '▼'}`}
                />
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
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder={`Search ${searchType.toLowerCase()}...`}
                        className="search-input"
                    />
                    <Button
                        type="submit"
                        className="search-btn"
                        icon={<img src={searchIcon} alt='Search Icon' className='search-icon' />}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
