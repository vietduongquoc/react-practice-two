// HomePage.jsx
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import CardBook from '../../components/CardBook'; // Import CardBook directly
import { fetchCard, addCardToFavorites } from '../../services/servicesCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books from API
        const fetchData = async () => {
            const { data, error } = await fetchCard();
            if (data) {
                setBooks(data);
            } else {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []);

    // Function to split books into rows with max 6 items per row
    const splitIntoRows = (books) => {
        return books.reduce((rows, book, index) => {
            const rowIndex = Math.floor(index / 6);
            if (!rows[rowIndex]) {
                rows[rowIndex] = [];
            }
            rows[rowIndex].push(book);
            return rows;
        }, []);
    };

    // Render each row of books with a maximum of 6 items per row
    const renderRows = () => {
        const rows = splitIntoRows(books);
        return rows.map((row, index) => (
            <div className="row" key={index}>
                {row.map((book) => (
                    <CardBook
                        key={book.id}
                        book={book}
                        onAddToFavorites={handleAddToFavorites}
                        onPreview={handlePreview}
                    />
                ))}
            </div>
        ));
    };

    const handleAddToFavorites = async (bookId) => {
        // Call API to add book to favorites
        const { data, error } = await addCardToFavorites(bookId);
        if (data) {
            // Update UI or show notification
        } else {
            console.error('Error adding to favorites:', error);
        }
    };

    const handlePreview = (cardId) => {
        // Navigate to preview page or open modal
        console.log('Preview book:', cardId);
    };

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <h1>Welcome to your Digital Library</h1>
                    <div className="homepage-content">{renderRows()}</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;