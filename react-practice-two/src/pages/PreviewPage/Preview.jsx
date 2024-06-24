import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Preview.css';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/SideBar';
import Button from '../../components/common/Button';
import authorImage from '../../assets/image/preview-image.png'
import arrowBack from '../../assets/image/arrow-small-left.png'
import rateStars from '../../assets/image/rate-stars.png'

const PreviewPage = () => {
    const { cardId } = useParams();
    const { state } = useLocation();
    console.log('PreviewPage state:', state);
    const navigate = useNavigate();
    const [status, setStatus] = useState('In-shelf');

    useEffect(() => {
        if (!state || !Array.isArray(state.books)) {
            console.error("Books data is invalid or not provided.", state);
            // Handle the error scenario or navigate back
            navigate('/'); // Example: Navigate back to homepage
        }
    }, [state, navigate]);

    const books = state ? state.books : [];

    const book = books.find(book => book.id.toString() === cardId);

    if (!book) {
        return <div>Book not found.</div>;
    }

    const isAvailable = status === 'In-shelf';

    return (
        <div className="preview-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <div className="preview-page">
                        <figure className='wrap-back-arrow'>
                            <a className='link-homepage' href="/home-page"><img src={arrowBack} alt="Arrow" className='icon-arrow' /></a>
                            <figcaption><a className='link-homepage' href="/home-page">Back to results</a></figcaption>
                        </figure>
                        <div className="preview-content">
                            <div className='preview-left'>
                                <img src={book.urlImage} alt={book.name} className="preview-book-image" />
                                <div className="preview-book-details">
                                    <h1 className="preview-book-title">{book.name}</h1>
                                    <p className="preview-book-author">Author: {book.author}</p>
                                    <div className='preview-book-ders'>
                                        <img src={rateStars} alt="stars" className="icon-start" />
                                        <p className="preview-book-rate">5.0 Ratings</p>
                                        <p>25 Currently reading</p>
                                        <p>119 Have read</p>
                                    </div>
                                    <div className='wrap-status'>
                                        <ul className="availability">Availability
                                            <li>
                                                <input type="checkbox" id="hardcopy" checked={true} readOnly />
                                                <label htmlFor="hardcopy">Hard Copy</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="ebook" checked={false} readOnly />
                                                <label htmlFor="ebook">E - Book</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="audiobook" checked={false} readOnly />
                                                <label htmlFor="audiobook">Audio book</label>
                                            </li>
                                        </ul>
                                        <div className="status">
                                            <p>Status</p>
                                            <Button
                                                onClick={() => setStatus(isAvailable ? 'None' : 'In-shelf')}
                                                className="status-button"
                                                text={status}
                                                color="btn-primary"
                                                borderRadius="btn-rounded"
                                                size="btn-medium"
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        size="btn-big"
                                        className="borrow-button"
                                        disabled={!isAvailable}
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
