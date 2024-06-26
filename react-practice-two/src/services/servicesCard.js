// servicesCard.js
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

export const addCardToFavorites = async (cardId) => {
    try {
        const response = await api.post(`/Card/${cardId}/favorites`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return { data: null, error };
    }
};

export const fetchBorrowedBooks = async () => {
    try {
        const response = await api.get('/BorrowedBooks');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
        return { data: null, error };
    }
};

export const fetchFavorites = async () => {
    try {
        const response = await api.get('/FavoriteBooks');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error fetching favorite books:', error);
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



export const removeFavorite = async (bookId) => {
    try {
        const response = await api.delete(`/Books/${bookId}/favorites`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error removing favorite:', error);
        return { data: null, error };
    }
};
