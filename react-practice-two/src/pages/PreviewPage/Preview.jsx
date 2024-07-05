import React, { useState, useEffect } from 'react';
import { getShelfBookDetail, addBookToShelf } from '../../services/servicesShelf';
import { useLoading } from '../../components/Spinner/LoadingProvider';
import arrowBack from '../../assets/image/arrow-small-left.png';
import { useToast } from '../../components/Toast/ToastProvider';
import authorImage from '../../assets/image/preview-image.png';
import { getCurrentUserId } from '../../services/servicesUser';
import { fetchBookById } from '../../services/servicesBook';
import rateStars from '../../assets/image/rate-stars.png'
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../layouts/Header';
import './Preview.css';

const PreviewPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState('In-shelf');
    const { showLoading, hideLoading } = useLoading();
    const addToast = useToast();
    const navigate = useNavigate();

    const fetchBookDetail = async (bookId) => {
        showLoading();
        try {
            const result = await fetchBookById(bookId);
            setBook(result)
        } catch (error) {
            console.error('Error fetching book details:', error);
            addToast('Error fetching book details', 'error');
            navigate('/home-page');
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        if (bookId) {
            fetchBookDetail(bookId);
        }
    }, [bookId]);

    const handleBorrowBook = async () => {
        showLoading();
        try {
            const userId = getCurrentUserId();
            const borrow = await getShelfBookDetail(userId, book._id.$oid);

            if (borrow.length > 0) {
                return addToast('Book is already in borrow', 'success');
            }

            const result = await addBookToShelf(userId, book._id.$oid)
            console.log('result: ', result)

            setStatus('Borrowed');
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

    return (
        <div className="preview-container">
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
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>Hard Copy</label>
                                            </li>
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>E - Book</label>
                                            </li>
                                            <li className='availability-ders'>
                                                <input type="checkbox" checked={true} readOnly />
                                                <label>Audio book</label>
                                            </li>
                                        </ul>
                                        <div className="status">
                                            <p>Status</p>
                                            <Button
                                                className="btn-enable"
                                                text='In-shelf'
                                                borderRadius="btn-rounded"
                                                size="btn-medium"
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        borderRadius="btn-rounded"
                                        size="btn-big"
                                        className="btn-primary"
                                        disabled={status !== 'In-shelf'}
                                        onClick={handleBorrowBook}
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
        </div>
    );
};

export default PreviewPage;