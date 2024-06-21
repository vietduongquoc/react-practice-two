import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import CardBook from '../../components/CardBook';
import { fetchCard, addCardToFavorites } from '../../services/servicesCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchCard();
            if (data) {
                setBooks(data);
                setFilteredBooks(data);
            } else {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []);

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

    const renderRows = () => {
        const rows = splitIntoRows(filteredBooks);
        return rows.map((row, index) => (
            <div className="row" key={index}>
                {row.map((book) => (
                    <CardBook
                        key={book.id}
                        book={book}
                        onAddToFavorites={handleAddToFavorites}
                        onPreview={() => handlePreview(book.id)}
                    />
                ))}
            </div>
        ));
    };

    const handleAddToFavorites = async (bookId) => {
        const { data, error } = await addCardToFavorites(bookId);
        if (data) {
            // Update UI or show notification
        } else {
            console.error('Error adding to favorites:', error);
        }
    };

    const handlePreview = (cardId) => {
        console.log('Preview book:', cardId, books);
        navigate(`/preview-page/${cardId}`, { state: { books } });
    };

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="main-content">
                <Header setFilteredBooks={setFilteredBooks} books={books} />
                <div className="content">
                    <div className="homepage-content">{renderRows()}</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
