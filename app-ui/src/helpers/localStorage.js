let authLS = [];

export const LS_KEY = {
    R0LE: 'R0LE',
};

export function getAuthLS(key) {
    return localStorage.getItem(key);
}
export function setAuthLS(key, value) {
    authLS.push(key);
    localStorage.setItem(key, value);
}
export function clearAuthLS() {
    [LS_KEY.R0LE].forEach((key) => {
        localStorage.removeItem(key);
    });
}