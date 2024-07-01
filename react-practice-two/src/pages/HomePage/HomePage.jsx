import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import ItemCard from '../../components/ItemCard';
import { fetchBook, addBookToFavorites, fetchBookById } from '../../services/servicesBook';
import { useToast } from '../../components/Toast/ToastProvider';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();
    const addToast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchBook();
            if (data) {
                setBooks(data);
                setFilteredBooks(data);
            }
        };

        fetchData();
    }, []);

    const splitIntoRows = (books) => {
        if (!Array.isArray(books)) {
            return [];
        }
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
                        key={book._id.$oid} // Use _id if id does not exist
                        book={book}
                        onAddToFavorites={handleAddToFavorites}
                        onPreview={() => handlePreview(book._id.$oid)} // Use _id if id does not exist
                    />
                ))}
            </div>
        ));
    };

    const handleAddToFavorites = async (bookId) => {
        try {
            const { data } = await addBookToFavorites(bookId, true);
            if (data) {
                addToast('Added to favorites', 'success');
            }
        } catch (error) {
            addToast('Error adding to favorites', 'error');
        }
    };

    const handlePreview = async (bookId) => {
        console.log('bookId: ', bookId)
        try {
            const { error } = await fetchBookById(bookId);
            if (error) {
                addToast(`Error fetching book details: ${error}`, 'error');
            } else {
                // Navigate to PreviewPage with book data
                navigate(`/preview-page/${bookId}`);
            }
        } catch (error) {
            addToast(`Error fetching book details: ${error.message}`, 'error');
        }
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