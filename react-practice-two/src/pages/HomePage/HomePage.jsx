import { useLoading } from '../../components/Spinner/LoadingProvider';
import { addBookToFavorites, fetchFavorites } from '../../services/servicesFavorite'
import { useToast } from '../../components/Toast/ToastProvider';
import { fetchBook } from '../../services/servicesBook';
import { getCurrentUserId, getToken } from '../../services/servicesUser';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Card';
import Header from '../../layouts/Header';

const HomePage = () => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const [favorites, setFavorites] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const addToast = useToast();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        showLoading();
        try {
            const userId = getCurrentUserId();
            const token = getToken();
            if (!token) {
                navigate('/login');
                return;
            }
            // Use Promise.all to fetch books and favorites concurrently
            const [listBook, listFavorite] = await Promise.all([
                fetchBook(),
                fetchFavorites(userId)
            ]);

            if (!Array.isArray(listBook)) {
                throw new Error('Expected listBook to be an array');
            }

            const newListBook = listBook.map(book => {
                return {
                    isFavorited: listFavorite.find(item => item.bookId === book._id.$oid) ? true : false,
                    ...book
                }
            })
            setBooks(newListBook);
            setFilteredBooks(newListBook);
        } catch (error) {
            addToast(`Error fetching books: ${error.message}`, 'error');
            localStorage.clear()
        } finally {
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
            const userId = getCurrentUserId();
            const isAlreadyFavorited = favorites.find(item => item.bookId === bookId);

            if (isAlreadyFavorited) {
                addToast('Book is already in favorites', 'success');
                return;
            }
            await addBookToFavorites(userId, bookId);
            // Update the favorites state directly
            const updatedFavorites = [...favorites, { bookId }];
            setFavorites(updatedFavorites);
            // Update the books state to reflect the new favorite status
            const updatedBooks = books.map(book => {
                if (book._id.$oid === bookId) {
                    return { ...book, isFavorited: true };
                }
                return book;
            });
            setBooks(updatedBooks);
            setFilteredBooks(updatedBooks);
            addToast('Added to favorites successfully', 'success');
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