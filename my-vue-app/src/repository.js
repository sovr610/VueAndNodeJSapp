import axios from 'axios';
const BASE_URL = 'http://localhost:5000';
export function getUsers() {
    return axios.get(`${BASE_URL}/user`)
        .then(response => response.data);
}
export function deleteUser(id) {
    return axios.post(`${BASE_URL}/user/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}
export function createUser(data) {
    return axios.post(`${BASE_URL}/user`, { title: data.title, body: data.body }).then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}
export function updateUser(data, id) {
    return axios.post(`${BASE_URL}/user${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}