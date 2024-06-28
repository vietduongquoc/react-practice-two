import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyShelf.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/Button';
import { fetchBook, fetchFavorites, updateBookStatus, updateFavoriteStatus } from '../../services/servicesBook';
import { useToast } from '../../components/Toast/ToastProvider';
import heartIcon from '../../assets/image/heart-icon.jpg'; // Import your heart icon

const MyShelf = () => {
    const [currentTab, setCurrentTab] = useState('all');
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const addToast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllBooks = async () => {
            const { data, error } = await fetchBook();
            if (error) {
                addToast('Error fetching borrowed books: ' + error, 'error');
            } else if (Array.isArray(data)) { // Kiểm tra dữ liệu là một mảng
                const borrowedBooks = data.filter(book => book.status === true);
                setBooks(borrowedBooks);
            } else {
                console.error('Data is not an array:', data);
            }
        };

        const fetchFavoriteBooks = async () => {
            const { data, error } = await fetchFavorites();
            if (error) {
                addToast('Error fetching favorite books: ' + error, 'error');
            } else if (Array.isArray(data)) { // Kiểm tra dữ liệu là một mảng
                const favoriteBooks = data.filter(book => book.favorite === true);
                setFavorites(favoriteBooks);
            } else {
                console.error('Data is not an array:', data);
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
        const { error } = await updateFavoriteStatus(bookId, false);
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
                            <button className={`tab ${currentTab === 'favorites' ? 'active' : ''}`} onClick={() => handleTabChange('favorites')}>Favorite</button>
                        </div>
                        {currentTab === 'all' && (
                            <div className="books-list">
                                {books.map(book => (
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
                                    <div key={book.id} className="book-item-favourite">
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
                                        <img
                                            src={heartIcon}
                                            alt="unlike to favorites"
                                            className="heart-icon"
                                            onClick={() => handleUnlikeBook(book.id)}
                                        />
                                        <Button
                                            onClick={() => navigate(`/preview-page/${book.id}`)}
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