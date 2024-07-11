import React from 'react';
import IconHeart from '../../../../components/Icon';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';

const FavoriteBooks = ({ favoriteBooks, handleUnlikeBook }) => {
    const navigate = useNavigate();

    return (
        <ul className="books-list">
            <ul className='wrap-book-item-favourite-title'>
                <li className='title-one'>Title</li>
                <li className='title-two'>Ratings</li>
                <li className='title-three'>Category</li>
                <li className='title-four'>Status</li>
            </ul>
            {favoriteBooks.map(book => (
                <li key={book._id.$oid} className="book-item-favourite">
                    <img src={book.urlImage} alt={book.name} className="book-item-favourite-image" />
                    <div className='book-item-favourite-content'>
                        <h3 className='book-item-name'>{book.name}</h3>
                        <p className='book-item-author'>{book.author}</p>
                    </div>
                    <p className="book-item-favourite-rate">4.5/<span>5</span></p>
                    <div className='book-item-favourite-category'>
                        <p>{book.Category}</p>
                    </div>
                    <Button
                        text="In-Shelf"
                        className="btn-In-Shelf"
                        color="btn-enable"
                        borderRadius="btn-rounded"
                    />
                    <IconHeart
                        className="iconHeart"
                        onClick={() => handleUnlikeBook(book.favoriteId)}
                        isFavorited
                    />
                    <Button
                        onClick={() => navigate(`/preview-page/${book._id.$oid}`)}
                        text="Preview"
                        className="btn-preview"
                        borderRadius="btn-rounded"
                    />
                </li>
            ))}
        </ul>
    );
};

export default FavoriteBooks;
