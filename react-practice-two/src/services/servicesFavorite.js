import axios from 'axios';
import { getToken } from './servicesUser';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet1/mongodb/AR9xBayt0H',
    withCredentials: false,
});

api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchFavorites = async (userId) => {
    try {
        const response = await api.get(`/favorites?q={"userId":"${userId}"}`);
        const {data} = response.data

       return data
    } catch (error) {
        console.error('Error fetching favorite books:', error);
        return error
    }
};

export const getFavoritesDetail = async (bookId) => {
    try {
        const response = await api.get(`/favorites?q={"bookId":"${bookId}"}`);
        const { data } = response.data;
        return {
            data
        }
    } catch (error) {
        console.error('Error fetching favorite book details:', error);
        return error
    }
}

export const addBookToFavorites = async (userId, bookId) => {
    const params = {
        data: {
            userId,
            bookId,
        }
    };
    try {
        const response = await api.post('/favorites', params);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return error
    }
};

export const updateFavoriteStatus = async (userId, bookId, updatedFavorite) => {
    const params = {
        data: {
            userId,
            favorite: updatedFavorite
        }
    };
    try {
        const response = await api.patch(`/favorites/${bookId}`, params);
        return { data: response.data.data, error: null };
    } catch (error) {
        console.error('Error updating favorite status:', error);
        return error
    }
};
