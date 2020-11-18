import cookie from 'js-cookie';

//Set cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

//Remove cookie
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
}

//Get cookie
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
}

// Set in localStorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Remove from localStorage
export const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

// Auth after login
export const authenticate = (res, next) => {
    setCookie('token', res.data.token);
    setLocalStorage('user', res.data.user);
    next();
}

//Log out
export const logout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

// Get info user from localStorage

export const isAuthUser = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

// Update info user from localStorage

export const updateUser = (res, next) => {
    if (typeof window !== 'undefined') {
        let authUser = JSON.parse(localStorage.getItem('user'));
        authUser = res.data.updatedUser;
        localStorage.setItem('user', JSON.stringify(authUser));
    }
    next();
};