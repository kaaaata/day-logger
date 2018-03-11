import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import store from './redux/store';
import Activity from './Activity';
import NewActivity from './NewActivity';
import './Day.css';

const mapDispatchToProps = (dispatch) => ({
  addActivity: (day) => dispatch(actions.addActivity(day)),
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
});

export default connect(null, mapDispatchToProps)(class Day extends Component {
  // componentWillMount() {
  //   if (!store.getState().default.activeActivity.id) {
  //     this.props.updateActiveActivity({ id: this.props.activities[0].id });
  //     console.log('updated active activity id=', this.props.activities[0].id);
  //   }
  // }

  render() {
    const { id, date, colors, activities, addActivity } = this.props;

    return (
      <div className="day">
        <div className="activities-container">
          <div onClick={() => addActivity({ id }) }>
            <div className="new-activity">
              <div className="content">
                +New Activity
              </div>
            </div>
          </div>
          {activities.map((activity, index) => (
            <Activity key={index} {...activity} />
          ))}
          {!activities.length && (
            <div className="no-activities">I've done nothing today yet.</div>
          )}
        </div>
        <div className="new-activity">
          <NewActivity />
        </div>
      </div>
    );
  }
});
