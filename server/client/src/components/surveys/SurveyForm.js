// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field component={SurveyField} text="type" label={label} name={name} key={name}/>
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySumbit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className='teal btn-flat right white-text'> Next
                        <i className='material-icons right'>done</i>
                    </button>
                    
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}
    errors.recipients = validateEmails(values.recipients || '')

    _.each(formFields, ({ name, noValueError }) => {
        if(!values[name]) {
            errors[name] = noValueError
        }
    })

    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);