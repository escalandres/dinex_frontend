import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    user: {
        uuid: string;
        email: string;
        name: string;
        lastname: string;
        profile_picture?: string;
        country: object;
        email_verified: boolean;
    };
    purpose: string;
    issuedAt: number; // timestamp of token issuance
}

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    const csrfToken = sessionStorage.getItem('csrfToken');
    if (!token || token === 'undefined' || csrfToken === 'undefined' || !csrfToken) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('csrfToken');
        return { decoded: null, token: null, csrfToken: null };
    }
    const decoded: DecodedToken = jwtDecode(token);
    loadUserPreferences(decoded.user.country);

    return { decoded, token, csrfToken };
}

export const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('csrfToken');
    window.location.href = '/login'; // Redirige al usuario a la página de login
}

export const updateTokens = (newToken: string, newCSRFToken: string) => {
    localStorage.setItem('token', newToken);
    sessionStorage.setItem('csrfToken', newCSRFToken);
}

export const saveTokens = (token: string, csrfToken: string) => {
    localStorage.setItem('token', token);
    sessionStorage.setItem('csrfToken', csrfToken);
}

export const isAuthenticated = () => {
    const { token, decoded } = decodeToken();
    // Check if the token exists in localStorage
    if (!token) {
        return false;
    }

    try {
        // Decode the token to get the expiration date
        const now = Date.now() / 1000; // Current time in seconds

        // Check if the token has expired
        if (decoded.exp < now) {
            // If the token has expired, remove it from localStorage
            localStorage.removeItem('token');
            return false;
        }

        // If the token is valid and has not expired
        return true;

    } catch (error) {
        console.error("Ocurrio un error:",error);
        // In case the token is invalid or there is an error decoding it
        localStorage.removeItem('token');
        return false;
    }
};

export const isEmailVerified = () => {
    const token = localStorage.getItem('token');
    // Check if the token exists in localStorage
    if (!token) {
        return false;
    }

    try {
        // Decode the token to get the expiration date
        const decoded: DecodedToken = jwtDecode(token);
        // console.log(decoded);
        const now = Date.now() / 1000; // Current time in seconds

        // Check if the token has expired
        if (decoded.exp < now) {
            // If the token has expired, remove it from localStorage
            localStorage.removeItem('token');
            return false;
        }

        if (!decoded?.user.email_verified) {
            return false;
        }

        // If the token is valid and has not expired
        return true;

    } catch (error) {
        console.error("Ocurrio un error:",error);
        // In case the token is invalid or there is an error decoding it
        localStorage.removeItem('token');
        return false;
    }
};

const createUserPreferences = (userCountryPreferences) => {
    const preferences = { country: userCountryPreferences.country_iso_code, language: userCountryPreferences.language_code, currency: { name: userCountryPreferences.currency, code: userCountryPreferences.currency_code, symbol: userCountryPreferences.currency_symbol }, country_icon: userCountryPreferences.flag_icon };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return preferences;
}

const loadUserPreferences = (userCountryPreferences) => {
    const preferences = localStorage.getItem('userPreferences');
    if (!preferences) createUserPreferences(userCountryPreferences);
};

export const getUserPreferences = () => {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : {};
};