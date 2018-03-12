import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import store from './redux/store';
import Activity from './Activity';
import NewActivity from './NewActivity';
import './styles/Day.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({
  addActivity: (day) => dispatch(actions.addActivity(day)),
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Day extends Component {
  componentWillMount() {
    const { days, activeDay, updateActiveActivity } = this.props;
    updateActiveActivity({ id: days.filter(day => day.id === activeDay.id)[0].activities[0].id });
  }

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
