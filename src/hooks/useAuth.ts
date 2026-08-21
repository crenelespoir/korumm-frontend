import { useState } from 'react';
import api from '../lib/api';

interface LoginResponse {
    accessToken: string;
    user: {
        id: string;
        nom: string;
        email: string;
    };
}

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(email: string, motDePasse: string) {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post<LoginResponse>('/auth/login', { email, motDePasse });
            localStorage.setItem('korumm_token', res.data.accessToken);
            localStorage.setItem('korumm_user', JSON.stringify(res.data.user));
            return true;
        } catch {
            setError('Email ou mot de passe incorrect');
            return false;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem('korumm_token');
        localStorage.removeItem('korumm_user');
    }

    function isAuthenticated() {
        return Boolean(localStorage.getItem('korumm_token'));
    }

    return {
        login,
        logout,
        isAuthenticated,
        loading,
        error,
    };
}
