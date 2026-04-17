import axios from 'axios';
import { encryptPayload, decryptResponse } from './cryptoUtils';

const apiClient = axios.create({
    baseURL: 'https://services-encr.iserveu.online/dev/nsdlab-internal',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Web',
        'pass_key': 'QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // Encrypt body if present (except for getState API)
    if (config.data && !config.url.includes('getState')) {
        config.data = encryptPayload(config.data);
    }
    return config;
});

apiClient.interceptors.response.use((response) => {
    if (response.data?.ResponseData) {
        response.data = decryptResponse(response.data.ResponseData);
    }
    return response;

});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login?error=session_expired';
        }
        return Promise.reject(error);
    }
);

export default apiClient;