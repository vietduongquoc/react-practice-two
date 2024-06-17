import axios from 'axios';
import configCard from '../configs/config-card';

const api = axios.create({
    baseURL: configCard.apiBaseUrl,
});

export const fetchCard = async () => {
    try {
        const response = await api.get('/Card');
        console.log("response.data", response.data );
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


export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/User', credentials);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error logging in user:', error);
        return { data: null, error: error.response ? error.response.data : error.message };
    }
};
