import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

function AppointmentForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const [appointmentDate, onDateChange] = useState(new Date());
    const [comment, commentFilled] = useState('');



    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Appointment datetime</label>
                <DateTimePicker
                    onChange={onDateChange}
                    value={appointmentDate}
                />
            </div>
            <div className="form-group">
                <label>
                    Comment:
                    <textarea className="form-control" value={comment.value} onChange={commentFilled} />
                </label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default AppointmentForm;