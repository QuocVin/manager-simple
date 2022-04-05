import axios from 'axios';

export const endpoints = {
    'login': '/api/authenticate',
    'register': '/api/users/createUser',
    'user-info': (userId) => `/api/users/detail?id=${userId}`,
    'user-update': '/api/users/update',
    'user-chart': '/api/users/chartRole',
    'user-search': '/api/users/searchName',
}

export const API = axios.create({
    baseURL: 'http://127.0.0.1:9000/',
})

export const endpoints2 = {
    'users': '/student',
    'users-update': (userId) => `/student/${userId}`,
    'users-del': (userId) => `/student/${userId}`,
    'users-search': (userId) => `/student?q=${userId}`,
    'users-by-id': (userId) => `/student?id=${userId}`,
}

export const API2 = axios.create({
    baseURL: 'http://127.0.0.1:3001/',
})