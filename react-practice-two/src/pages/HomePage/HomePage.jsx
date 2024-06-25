import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import ItemCard from '../../components/ItemCard';
import { fetchCard, addCardToFavorites } from '../../services/servicesCard';
import { useToast } from '../../components/Toast/ToastManager';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();
    const addToast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchCard();
            if (data) {
                setBooks(data);
                setFilteredBooks(data);
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
                    <ItemCard
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
        try {
            const { data } = await addCardToFavorites(bookId);
            if (data) {
                addToast('Added to favorites', 'success');
            } else {
                addToast('Error adding to favorites', 'error');
            }
        } catch (error) {
            addToast('Error adding to favorites', 'error');
        }
    };

    const handlePreview = (bookId) => {
        navigate(`/preview-page/${bookId}`);
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
