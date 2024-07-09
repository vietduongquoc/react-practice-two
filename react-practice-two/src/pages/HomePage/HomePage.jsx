import { useLoading } from '../../components/Spinner/LoadingProvider';
import { addBookToFavorites, fetchFavorites, getFavoritesDetail } from '../../services/servicesFavorite'
import { useToast } from '../../components/Toast/ToastProvider';
import { fetchBook } from '../../services/servicesBook';
import { getCurrentUserId } from '../../services/servicesUser';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Card';
import Header from '../../layouts/Header';

const HomePage = () => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const addToast = useToast();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        showLoading();
        try {
            const listBook = await fetchBook();
            const userId = getCurrentUserId();
            const listFavorite = await fetchFavorites(userId);

            const newListBook = listBook.map(book => {
                return {
                    isFavorited: listFavorite.find(item => item.bookId === book._id.$oid) ? true : false,
                    ...book
                }
            })

            setBooks(newListBook);
            // Initialize filteredBooks with the full list
            setFilteredBooks(newListBook);
        } catch (error) {
            addToast(`Error fetching books: ${error.message}`, 'error');
        }
        finally {
            hideLoading();
        }
    };

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
        // Use filteredBooks instead of books
        const rows = splitIntoRows(filteredBooks);
        return rows.map((row, index) => (
            <div className="row" key={index}>
                {row.map((book) => (
                    <ItemCard
                        // Use _id if id does not exist
                        key={book._id.$oid}
                        book={book}
                        isFavorited={book.isFavorited}
                        onAddToFavorites={() => handleAddToFavorites(book._id.$oid)}
                        onPreview={() => handlePreview(book._id.$oid)}
                    />
                ))}
            </div>
        ));
    };

    const handleAddToFavorites = async (bookId) => {
        try {
            const favorite = await getFavoritesDetail(bookId);
            if (favorite.data.length > 0) {
                return addToast('Book is already in favorites', 'success');
            }
            const userId = getCurrentUserId();
            const result = await addBookToFavorites(userId, bookId);
            await fetchData();
            return addToast('Added to favorites successfully', 'success');
        } catch (error) {
            addToast('Failed to add to favorites: ' + error.message, 'error');
        }
    };

    const handlePreview = async (bookId) => {
        // Navigate to PreviewPage with book data
        navigate(`/preview-page/${bookId}`);
    };

    return (
        <div className="homepage-container">
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