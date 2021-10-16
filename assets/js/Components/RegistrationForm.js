import React, {Component} from "react";
import {registerUser} from "../Api/registration";
import {Formik, Form, Field, ErrorMessage} from 'formik';

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Enter your credentials:</h1>
                <Formik
                    initialValues={{
                        email: '', firstName: '', lastName: '',
                        personalId: '', password: '', repeatedPassword: ''
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.firstName) {
                            errors.firstName = 'First name is required';
                        }
                        if (!values.lastName) {
                            errors.lastName = 'Last name is required';
                        }
                        if (!values.personalId) {
                            errors.personalId = 'PIN is required';
                        }
                        if (!values.password) {
                            errors.password = 'Password is required';
                        }

                        if (!values.password) {
                            errors.repeatedPassword = 'Repeat password is required';
                        }

                        if(values.password !== values.repeatedPassword) {
                            errors.repeatedPassword = 'Password and repeat password do not match';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        const payload = {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            personalID: values.personalId,
                            password: values.password,
                            passwordRepeated: values.repeatedPassword
                        };
                        console.log(payload);

                        registerUser(payload)
                            .then((resp) => {
                                alert('Successful registration. Proceed to login');
                                setSubmitting(false);
                                window.location.href = "/login";
                            })
                            .catch((resp) => {
                                let errors = 'Server validation errors: \n';
                                resp.response.data.violations.forEach(function (item, index) {
                                    errors += item.propertyPath + ': ' + item.message + '\n';
                                });
                                alert(errors);
                                setSubmitting(false);
                            });

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <Field type="text" name="firstName" className={'form-control'}/>
                                <ErrorMessage name="firstName" component="div" className={'text-danger'}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <Field type="text" name="lastName" className={'form-control'}/>
                                <ErrorMessage name="form-group" component="div" className={'text-danger'}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <Field type="email" name="email" className={'form-control'}/>
                                <ErrorMessage name="email" component="div" className={'text-danger'}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="personalId">Personal Identification Number</label>
                                <Field type="text" name="personalId" className={'form-control'}/>
                                <ErrorMessage name="personalId" component="div"  className={'text-danger'}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="personalId">Password</label>
                                <Field type="password" name="password" className={'form-control'}/>
                                <ErrorMessage name="password" component="div"  className={'text-danger'}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeatedPassword">Repeat password</label>
                                <Field type="password" name="repeatedPassword" className={'form-control'}/>
                                <ErrorMessage name="repeatedPassword" component="div"  className={'text-danger'}/>
                            </div>
                            <br/>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
