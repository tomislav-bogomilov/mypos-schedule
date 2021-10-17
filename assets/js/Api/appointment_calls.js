import axios from "axios/index";

/**
 * Returns a Promise object with appointments
 *
 * @returns {Promise<Response>}
 */
export function getAllAppointments() {
    const token = localStorage.getItem('access_token');

    return fetch('/api/appointments?pagination=false',
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            return response.json();
        });
}

/**
 * Returns a Promise object with appointments
 * TODO use the first with parameter (making second only for clarity)
 *
 * @returns {Promise<Response>}
 */
export function getPaginatedAppointments(page = 1, clientEmail = null, criteria = []) {
    var filterQueryString = '';
    if (clientEmail) {
        filterQueryString += '&user.email=' + clientEmail;
    }
    if (criteria.pin) {
        filterQueryString += '&user.personalID=' + criteria.pin;
    }

    if (criteria.from && criteria.to) {
        filterQueryString += '&startDateTime[after]=' + criteria.from;
        filterQueryString += '&startDateTime[before]=' + criteria.to;
    }

    const token = localStorage.getItem('access_token');

    return fetch('/api/appointments?page=' + page + filterQueryString + '&order[startDateTime]=desc',
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            return response.json();
        });
}

/**
 * Deletes appointment
 *
 * @param id
 * @returns {Promise<string>}
 */
export function deleteAppointment(id) {
    const token = localStorage.getItem('access_token');

    return fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '');
    });
}

/**
 * Fetches appointment
 * @param id
 * @returns {Promise<string>}
 */
export function getAppointment(id) {
    const token = localStorage.getItem('access_token');

    return fetch(`/api/appointments/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '');
    });
}

export function saveAppointment(payload) {
    const token = localStorage.getItem('access_token');

    return axios.post('/api/appointments', payload,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(result => { return result; })
        .catch(error => {
           throw error;
        });
}