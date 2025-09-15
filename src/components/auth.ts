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
    if (!token) {
        return { decoded: null, token: null, csrfToken: null };
    }
    const decoded: DecodedToken = jwtDecode(token);
    const csrfToken = sessionStorage.getItem('csrfToken');

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