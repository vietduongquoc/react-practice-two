import React from 'react';
import HeartIcon from '../../components/Icon';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const FavoriteBooks = ({ favoriteBooks, handleUnlikeBook }) => {
    const navigate = useNavigate();

    return (
        <div className="books-list">
            <div className='wrap-book-item-favourite-title'>
                <p className='title-one'>Title</p>
                <p className='title-two'>Ratings</p>
                <p className='title-three'>Category</p>
                <p className='title-four'>Status</p>
            </div>
            {favoriteBooks.map(book => (
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
                        onClick={() => handleUnlikeBook(book.favoriteId)}
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
    );
};

export default FavoriteBooks;
