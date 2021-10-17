import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React, {Component} from "react";
import {registerUser} from "../Api/registration";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default class AppointmentsFilter extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Formik
                initialValues={{
                    from: '', to: '', personalId: ''
                }}

                onSubmit={(values, { setSubmitting }) => {
                    let criteriaArray = [
                        {'pin': ''},
                        {'from': ''},
                        {'to': ''}
                    ];

                    // flags used for criterion for filtering
                    let hasEmptyPIN = true;
                    let hasEmptyDatetimeFilter = values.from && values.to ? false : true;

                    if (values.personalId) {
                        criteriaArray.pin = values.personalId;
                        hasEmptyPIN = false;
                    }

                    if (values.from) {
                        criteriaArray.from = values.from.format('YYYY-MM-DD HH:MM');
                    }

                    if (values.to) {
                        criteriaArray.to = values.to.format('YYYY-MM-DD HH:MM');
                    }

                    if (hasEmptyPIN && hasEmptyDatetimeFilter) {
                        alert('Not enough data for filtering appointments');
                    } else {
                        this.props.filterCallback(criteriaArray);
                    }

                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <br/>
                        <div className={'row'}>
                            <div className={'col-3'}>
                                <div className="form-group">
                                    <label htmlFor="from">From datetime</label>
                                    <Field
                                        name="from"
                                        render={({from,form:{isSubmitting}})=>(
                                            <Datetime
                                                onChange={from=>{
                                                    setFieldValue('from',from)
                                                }}
                                                timeConstraints={{ minutes: { step: 30 } }}/>
                                        )}
                                        className={'form-control'}
                                    />
                                    <ErrorMessage name="from" component="div" />
                                </div>
                            </div>
                            <div className={'col-3'}>
                                <div className="form-group">
                                    <label htmlFor="to">To datetime</label>
                                    <Field
                                        name="to"
                                        render={({to,form:{isSubmitting}})=>(
                                            <Datetime
                                                onChange={to=>{
                                                    setFieldValue('to',to)
                                                }}
                                                timeConstraints={{ minutes: { step: 30 } }}/>
                                        )}
                                        className={'form-control'}
                                    />
                                    <ErrorMessage name="from" component="div" />
                                </div>
                            </div>
                            <div className={'col-3'}>
                                <div className="form-group">
                                    <label htmlFor="personalId">PIN (exact)</label>
                                    <Field type="text" name="personalId" className={'form-control'}/>
                                    <ErrorMessage name="personalId" component="div"  className={'text-danger'}/>
                                </div>
                            </div>
                            <div className={'col-3'} style={{paddingTop: '1.7rem'}}>
                                <button type="submit" disabled={isSubmitting}>
                                    Filter
                                </button>
                            </div>
                        </div>

                        <br/>

                    </Form>
                )}
            </Formik>
        );
    }
}