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
export function getPaginatedAppointments(page = 1) {
    return fetch('/api/appointments?page=' + page)
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