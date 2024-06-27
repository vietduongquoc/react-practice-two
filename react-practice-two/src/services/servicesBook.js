// servicesBook.js
import axios from 'axios';
import configCard from '../configs/config-card';

const api = axios.create({
    baseURL: configCard.apiBaseUrl,
});

export const fetchCard = async () => {
    try {
        const response = await api.get('/Card');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error fetching Card:', error);
        return { data: null, error };
    }
};

export const fetchFavorites = async () => {
    try {
        const response = await api.get('/Card');
        const favoriteBooks = response.data.filter(book => book.favorites === true);
        console.log('favoriteBooks', favoriteBooks);
        return { data: favoriteBooks, error: null };
    } catch (error) {
        console.error('Error fetching favorite books:', error);
        return { data: null, error };
    }
};

export const addCardToFavorites = async (cardId, updatedFavourite) => {
    try {
        const response = await api.put(`/Card/${cardId}`, { favorites: updatedFavourite });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return { data: null, error };
    }
};

export const updateBookStatus = async (cardId, updatedStatus) => {
    try {
        const response = await api.put(`/Card/${cardId}`, { status: updatedStatus });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error updating book status:', error);
        return { data: null, error };
    }
};

export const updateFavoriteStatus = async (cardId, updatedFavorite) => {
    try {
        const response = await api.put(`/Card/${cardId}`, { favorite: updatedFavorite });
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error updating favorite status:', error);
        return { data: null, error };
    }
};