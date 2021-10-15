// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginCheck } from '../Api/authentication';
import { Redirect } from 'react-router-dom'

const LoginForm = () => (
    <div>
        <h1>Insert your credentials</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                const payload = {
                    username: values.email,
                    password: values.password
                };
                loginCheck(payload)
                    .then((resp) => {
                        const token = resp.data.token;
                        localStorage.setItem('access_token', token);
                        localStorage.setItem('user_email', values.email,);
                        window.location.href = "/";
                    })
                    .catch((res) => {
                        alert('Invalid credentials.');
                        setSubmitting(false);
                    });

            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <Field type="email" name="email" className={'form-control'}/>
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <Field type="password" name="password" className={'form-control'}/>
                        <ErrorMessage name="password" component="div" />
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

export default LoginForm;