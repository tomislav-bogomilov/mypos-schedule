import axios from 'axios';

/**
 * Register user
 *
 * @returns {Promise<Response>}
 */
export function registerUser(payload) {
    return axios.post('/api/users', payload)
        .then(result => { console.log(result); return result; })
        .catch(error => { console.error(error); throw error; });
}
