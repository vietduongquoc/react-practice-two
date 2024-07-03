import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyShelf.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/Button';
import { updateBookStatus, fetchBookById } from '../../services/servicesBook';
import { fetchFavorites, updateFavoriteStatus } from '../../services/servicesFavorite';
import { getCurrentUserId } from '../../services/servicesUser';
import { useToast } from '../../components/Toast/ToastProvider';
import HeartIcon from '../../components/Icon';
import { fetchShelfBooks } from '../../services/servicesShelf';

const MyShelf = () => {
    const [currentTab, setCurrentTab] = useState('all');
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const addToast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllBooks();
        fetchFavoriteBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const userId = getCurrentUserId();
            const result = await fetchShelfBooks(userId);
            const promises = result.map(item => fetchBookById(item.bookId));
            const responses = await Promise.all(promises);
            console.log('responses: ', responses)
            setBooks(responses);
        } catch (error) {
            addToast('Error fetching borrowed books: ' + error, 'error');
        }
    };

    const fetchFavoriteBooks = async () => {
        try {
            const userId = getCurrentUserId();
            const result = await fetchFavorites(userId);
            const promises = result.map(item => fetchBookById(item.bookId));
            const responses = await Promise.all(promises);
            setFavorites(responses);
        } catch (error) {
            addToast('Error fetching favorite books: ' + error, 'error');
        }
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const handleReturnBook = async (bookId) => {
        const { error } = await updateBookStatus(bookId, false);
        if (error) {
            addToast('Failed to return book: ' + error, 'error');
        } else {
            setBooks(books.filter(book => book._id.$oid !== bookId));
            addToast('Book returned successfully', 'success');
        }
    };

    const handleUnlikeBook = async (bookId) => {
        const { error } = await updateFavoriteStatus(bookId, false);
        if (error) {
            addToast('Failed to remove book from favorites: ' + error, 'error');
        } else {
            setFavorites(favorites.filter(book => book._id.$oid !== bookId));
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
                            <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite</button>
                        </div>
                        {currentTab === 'all' && (
                            <div className="books-list">
                                {books.map(book => (
                                    <article key={book._id.$oid} className="book-item">
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
                                                onClick={() => handleReturnBook()}
                                                text="Return"
                                                className="btn-return"
                                                size="btn-large"
                                            />
                                        </aside>
                                    </article>
                                ))}
                            </div>
                        )}
                        {currentTab === 'favorites' && (
                            <div className="books-list">
                                <div className='wrap-book-item-favourite-title'>
                                    <p className='title-one'>Title</p>
                                    <p className='title-two'>Ratings</p>
                                    <p className='title-three'>Category</p>
                                    <p className='title-four'>Status</p>
                                </div>
                                {favorites.map(book => (
                                    <div key={book._id.$oid} className="book-item-favourite">
                                        <img src={book.urlImage} alt={book.name} className="book-item-favourite-image" />
                                        <div className='book-item-favourite-content'>
                                            <h3 className='book-item-name'>{book.name}</h3>
                                            <p className='book-item-author'>{book.author}</p>
                                        </div>
                                        <p className="book-item-favourite-rate">4.5/<span>5</span></p>
                                        <div className='book-item-favourite-category'>
                                            <p>Computer Science</p>
                                            <p>Ux Design</p>
                                        </div>
                                        <Button
                                            text="In-Shelf"
                                            className="btn-In-Shelf"
                                            color="btn-enable"
                                            borderRadius="btn-rounded"
                                        />
                                        <HeartIcon
                                            className="heart-icon"
                                            onClick={() => handleUnlikeBook(book._id.$oid)}
                                        />
                                        <Button
                                            onClick={() => navigate(`/preview-page/${book._id.$oid}`)}
                                            text="Preview"
                                            className="btn-preview"
                                            borderRadius="btn-rounded"
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
