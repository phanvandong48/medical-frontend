import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            checkAuthStatus();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            setCurrentUser(res.data.user);
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setCurrentUser(res.data.user);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post('/api/auth/register', userData);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setCurrentUser(res.data.user);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Thêm hàm useAuth để sử dụng trong component khác
export const useAuth = () => useContext(AuthContext);
