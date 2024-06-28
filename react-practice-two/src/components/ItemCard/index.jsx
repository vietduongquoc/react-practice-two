import React from 'react';
import './index.css';
import heartIcon from '../../assets/image/heart-icon.jpg'; // Import your heart icon
import { addBookToFavorites } from '../../services/servicesBook';
import { useToast } from '../../components/Toast/ToastProvider';

const ItemCard = ({ book, onPreview }) => {
    const addToast = useToast();

    const handleAddToFavorites = async (event) => {
        event.stopPropagation();
        try {
            const { error } = await addBookToFavorites(book.id, true);
            // const { error } = await addBookToFavorites(book._id, !book.favorite);
            if (error) {
                addToast('Failed to add to favorites: ' + error, 'error');
            } else {
                addToast('Added to favorites successfully', 'success');
            }
        } catch (error) {
            addToast('Failed to add to favorites: ' + error.message, 'error');
        }
    };

    const handlePreview = () => {
        onPreview(book.id);
    };

    return (
        <article className="item-card" onClick={handlePreview}>
            <img src={book.urlImage} alt={book} className="book-image" />
            <div className='wrap-card-content'>
                <div className="book-details">
                    <p className='book-details-name'>{book.name}</p>
                    <p className='book-details-author'>{book.author}</p>
                    <p className='book-details-rate'>4.5/5</p>
                </div>
                <div className="heart-icon-actions">
                    <img
                        src={heartIcon}
                        alt="Add to favorites"
                        className="heart-icon"
                        // className={`heart-icon ${book.favorite ? 'favorited' : ''}`}
                        onClick={handleAddToFavorites}
                    />
                </div>
            </div>
        </article>
    );
};

export default ItemCard;
