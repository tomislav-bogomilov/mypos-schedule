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