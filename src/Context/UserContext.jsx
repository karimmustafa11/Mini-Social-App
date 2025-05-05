import { createContext, useState, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error('Failed to parse user data', error);
            return null;
        }
    });

    const login = useCallback((userData) => {
        try {
            const { password, ...safeUserData } = userData;
            setUser(safeUserData);
            localStorage.setItem('user', JSON.stringify(safeUserData));
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};