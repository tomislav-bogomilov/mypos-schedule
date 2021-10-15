/**
 * Returns a Promise object with appointments
 *
 * @returns {Promise<Response>}
 */
export function getAllAppointments() {
    return fetch('/api/appointments?pagination=false')
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
export function getPaginatedAppointments(page = 1, clientEmail = null) {
    var filterQueryString = '';
    if (clientEmail) {
        filterQueryString += '&user.email=' + clientEmail;
    }
    return fetch('/api/appointments?page=' + page + filterQueryString)
        .then(response => {
            return response.json();
        });
}

export function deleteAppointment(id) {
    return fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
    }).then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '');
    });
}

export function getAppointment(id) {
    return fetch(`/api/appointments/${id}`, {
        method: 'GET'
    }).then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '');
    });
}