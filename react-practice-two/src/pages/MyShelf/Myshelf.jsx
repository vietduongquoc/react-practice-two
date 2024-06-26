import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyShelf.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/Button';
import { fetchCard, fetchFavorites, updateBookStatus, removeFavorite } from '../../services/servicesCard';
import { useToast } from '../../components/Toast/ToastProvider';

const MyShelf = () => {
    const [currentTab, setCurrentTab] = useState('all');
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const addToast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllBooks = async () => {
            const { data, error } = await fetchCard();
            if (error) {
                addToast('Error fetching borrowed books: ' + error, 'error');
            } else {
                const borrowedBooks = data.filter(book => book.status === true);
                setBooks(Array.isArray(borrowedBooks) ? borrowedBooks : []);
            }
        };

        const fetchFavoriteBooks = async () => {
            const { data, error } = await fetchFavorites();
            if (error) {
                // addToast('Error fetching favorite books: ' + error, 'error');
            } else {
                setFavorites(Array.isArray(data) ? data : []);
            }
        };

        fetchAllBooks();
        fetchFavoriteBooks();
    }, [addToast]);

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const handleReturnBook = async (bookId) => {
        const { error } = await updateBookStatus(bookId, false);
        if (error) {
            addToast('Failed to return book: ' + error, 'error');
        } else {
            setBooks(books.filter(book => book.id !== bookId));
            addToast('Book returned successfully', 'success');
        }
    };

    const handleUnlikeBook = async (bookId) => {
        const { error } = await removeFavorite(bookId);
        if (error) {
            addToast('Failed to remove book from favorites: ' + error, 'error');
        } else {
            setFavorites(favorites.filter(book => book.id !== bookId));
            addToast('Book removed from favorites', 'success');
        }
    };

    return (
        <div className="my-shelf-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <div className='myshelf-page'>
                        <h1 className='myshelf-title'>Your <span>Shelf</span></h1>
                        <div className="tabs">
                            <button className={`tab ${currentTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Books</button>
                            <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite Books</button>
                        </div>
                        {currentTab === 'all' && (
                            <div className="books-list">
                                {Array.isArray(books) && books.map(book => (
                                    <article key={book.id} className="book-item">
                                        <div className='book-item-column-left'>
                                            <img src={book.urlImage} alt={book.name} className="book-item-image" />
                                            <h3 className='book-item-name'>{book.name}</h3>
                                            <p className='book-item-author'>{book.author}</p>
                                            <p className="book-item-rate">5.0 Ratings</p>
                                        </div>
                                        <aside className="book-item-column-right">
                                            <div className="book-item-column-right-text">
                                                <p className='book-item-status'>Borrowed on </p>
                                                <p className='book-item-time'>11 Mar 2023 09:00 AM</p>
                                            </div>
                                            <Button
                                                onClick={() => handleReturnBook(book.id)}
                                                text="Return"
                                                className="btn-return"
                                            />
                                        </aside>
                                    </article>
                                ))}
                            </div>
                        )}
                        {currentTab === 'favorites' && (
                            <div className="books-list">
                                {Array.isArray(favorites) && favorites.map(book => (
                                    <div key={book.id} className="book-item">
                                        <h3>{book.name}</h3>
                                        <Button
                                            onClick={() => handleUnlikeBook(book.id)}
                                            text="Unlike"
                                            className="btn-unlike"
                                        />
                                        <Button
                                            onClick={() => navigate(`/preview/${book.id}`)}
                                            text="Preview"
                                            className="btn-preview"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyShelf;