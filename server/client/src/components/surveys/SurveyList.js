import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import BarChart from '../chart/BarChat';

class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className='card darken-1' key={survey._id}>
                    <div className='card-content indigo darken-4 white-text'> 
                        <div className='row'>
                            <span className='card-title col s10'>{survey.title}</span>
                            <button class="btn-flat red col s2 center" onClick={() => this.props.deleteSurvey(survey._id)}><i class="material-icons">delete</i></button>
                        </div>
                        <div className='row'>
                            <p className='col s9'>{survey.body}</p>
                            <p className='col s3'>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className='card-action'>
                        <BarChart yes={survey.yes} no={survey.no}/>
                        <p>Last Updated: {survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                {this.props.surveys.length ? this.renderSurveys() : <div>Create a new survey!</div> }
            </div>
        )
    }
}

function mapStateToProp({ surveys }){
    return { surveys }
}

export default connect(mapStateToProp, actions)(SurveyList)