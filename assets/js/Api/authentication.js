import axios from 'axios';

/**
 * Retrieves token if authenticated by given user credentials
 *
 * @returns {Promise<Response>}
 */
export function loginCheck(payload) {
    return axios.post('/api/login_check', payload)
        .then(result => { console.log(result); return result; })
        .catch(error => { console.error(error); throw error; });
}

export function getUserByToken() {
    
}
