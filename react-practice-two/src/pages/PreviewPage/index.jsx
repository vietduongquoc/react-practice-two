import React, { useState, useEffect } from 'react';
import { getShelfBookDetail, addBookToShelf } from '../../services/shelfService';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import arrowBack from '../../assets/images/arrow-left.png';
import { useToast } from '../../components/Toast/ToastProvider';
import authorImage from '../../assets/images/image-author.png';
import { getCurrentUserId } from '../../services/userService';
import { fetchBookById } from '../../services/bookService';
import rateStars from '../../assets/images/rate-stars.png';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../layouts/Header';
import { STATUS_IN_SHELF, STATUS_NONE } from '../../constants/status';

const PreviewPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState(STATUS_NONE);
    const { showLoading, hideLoading } = useLoading();
    const addToast = useToast();

    useEffect(() => {
        if (bookId) {
            fetchBookDetail(bookId);
        }
    }, [bookId]);

    const fetchBookDetail = async (bookId) => {
        showLoading();
        try {
            const userId = getCurrentUserId();
            const [result, borrow] = await Promise.all([
                fetchBookById(bookId),
                getShelfBookDetail(bookId)
            ]);
            setBook(result);
            if (borrow.find(item => item.userId === userId)) {
                setStatus(STATUS_IN_SHELF);
            } else {
                setStatus(STATUS_NONE);
            }
        } catch (error) {
            addToast('Error fetching book details', 'error');
        } finally {
            hideLoading();
        }
    };

    const handleBorrowBook = async () => {
        if (status !== STATUS_NONE) return;
        showLoading();
        try {
            const userId = getCurrentUserId();
            const borrow = await getShelfBookDetail(userId, book._id.$oid);
            if (borrow.length > 0) {
                setStatus(STATUS_IN_SHELF);
                return addToast('Book is already in borrow', 'success');
            }

            await addBookToShelf(userId, book._id.$oid);
            setStatus(STATUS_IN_SHELF);
            addToast('Book borrowed successfully', 'success');
        } catch (error) {
            addToast('Failed to borrow book: ' + error.message, 'error');
        } finally {
            hideLoading();
        }
    };

    if (!book) {
        return <div className="loading-container">Loading...</div>;
    }

    const availabilityOptions = [
        { label: 'Hard Copy', checked: true },
        { label: 'E - Book', checked: true },
        { label: 'Audio book', checked: true }
    ];

    return (
        <div className="main-content">
            <Header />
            <div className="content">
                <div className="preview-page">
                    <figure className='wrap-back-arrow'>
                        <a className='link-homepage' href="/"><img src={arrowBack} alt="Arrow" className='icon-arrow' /></a>
                        <figcaption><a className='link-homepage' href="/">Back to results</a></figcaption>
                    </figure>
                    <div className="preview-content">
                        <div className='preview-left'>
                            <div className='wrap-preview-book-image'>
                                <img src={book.urlImage} alt={book.name} className="preview-book-image" />
                            </div>
                            <div className="preview-book-details">
                                <h1 className="preview-book-title">{book.name}</h1>
                                <div className='preview-book-ders'>
                                    <img src={rateStars} alt="stars" className="icon-start" />
                                    <p className="preview-book-rate">5.0 Ratings</p>
                                    <p>25 Currently reading</p>
                                    <p>119 Have read</p>
                                </div>
                                <div className='wrap-status'>
                                    <ul className="availability-title">Availability
                                        {availabilityOptions.map((option, index) => (
                                            <li key={index} className='availability-ders'>
                                                <input type="checkbox" checked={option.checked} readOnly />
                                                <label>{option.label}</label>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="status">
                                        <p>Status</p>
                                        <Button
                                            className="btn-enable"
                                            text={status}
                                            borderRadius="btn-rounded"
                                            size="btn-medium"
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                                <Button
                                    borderRadius="btn-rounded"
                                    size="btn-big"
                                    className={status === STATUS_NONE ? 'btn-primary' : 'btn-disabled'}
                                    disabled={status !== STATUS_NONE}
                                    onClick={status === STATUS_NONE ? handleBorrowBook : null}
                                    text="BORROW"
                                />
                            </div>
                        </div>
                        <aside className="preview-right">
                            <div className='preview-right-wrap-header'>
                                <div className='wrap-title'>
                                    <h2 className="preview-title">About <span>Author</span></h2>
                                    <p>{book.author}</p>
                                </div>
                                <img src={authorImage} alt='authorImage' className="preview-image" />
                            </div>
                            <p className="preview-description">Steve Krug is a usability consultant who has more than 30 years of experience
                                as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success
                                of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.</p>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
