import React from 'react';
import './index.css';
import { addBookToFavorites, getFavoritesDetail } from '../../services/servicesFavorite';
import { useToast } from '../../components/Toast/ToastProvider';
import { useNavigate } from 'react-router-dom';
import HeartIcon from "../Icon/index";
import { getCurrentUserId } from '../../services/servicesUser';

const ItemCard = ({ book, onPreview }) => {
    const addToast = useToast();
    const navigate = useNavigate();

    const handleAddToFavorites = async () => {
        try {
            const favorite = await getFavoritesDetail(book._id.$oid);
            console.log("favorite", favorite.data);

            if (favorite.data.length > 0) {
                return addToast('Book is already in favorites', 'success');
            }

            const userId = getCurrentUserId();

            const result = await addBookToFavorites(userId, book._id.$oid);
            console.log('result: ', result)

            return addToast('Added to favorites successfully', 'success');
        } catch (error) {
            addToast('Failed to add to favorites: ' + error.message, 'error');
        }
    };

    const handlePreview = async () => {
        await onPreview();
        navigate(`/preview-page/${book._id.$oid}`);
    };

    return (
        <article className="item-card">
            <figure onClick={handlePreview}>
                <img src={book.urlImage} alt={book.name} className="book-image" />
            </figure>
            <div className='wrap-card-content'>
                <div className="book-details">
                    <p className='book-details-name'>{book.name}</p>
                    <p className='book-details-author'>{book.author}</p>
                    <p className='book-details-rate'>4.5/5</p>
                </div>
                <div className="heart-icon-actions">
                    <HeartIcon
                        onClick={handleAddToFavorites}
                    />
                </div>
            </div>
        </article>
    );
};

export default ItemCard;