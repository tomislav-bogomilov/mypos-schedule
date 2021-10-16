// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { saveAppointment } from '../Api/appointment_calls'

const AppointmentForm = () => (
    <div>
        <h1>Create appointment</h1>
        <Formik
            initialValues={{ from: '', comment: '' }}
            validate={values => {
                const errors = {};
                if (!values.from) {
                    errors.from = 'Appointment from datetime is required.';
                }
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                const payload = {
                    startDateTime: values.from ? values.from.format('YYYY-MM-DD HH:MM') : '' ,
                    comment: values.comment
                };

                saveAppointment(payload)
                    .then((resp) => {
                       //TODO add server side validation
                        alert('Appointment is created!');
                        setSubmitting(false);
                    })
                    .catch((res) => {
                        alert(res);
                        setSubmitting(false);
                    });

            }}
        >
            {({ submitForm, isSubmitting, values, setFieldValue }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="from">Appointment datetime (appointment duration is 30 minutes)</label>
                        {status && status.msg && (
                            <p className={`alert ${ status.sent ? "alert-success" : "alert-error"}`}>
                                {status.msg}
                            </p>
                        )}
                        <Field
                            name="from"
                            render={({from,form:{isSubmitting}})=>(
                                <Datetime onChange={from=>{
                                    setFieldValue('from',from)
                                }}/>
                            )}
                            className={'form-control'}
                        />
                        <ErrorMessage name="from" component="div" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <Field component="textarea" name="comment" className={'form-control'} rows={4}/>
                        <ErrorMessage name="comment" component="div" />
                    </div>
                    <br/>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default AppointmentForm;
