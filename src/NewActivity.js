import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import store from './redux/store';
import _ from 'lodash';
import Box from './Box';
import './styles/NewActivity.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  activeActivity: state.default.activeActivity,
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({
  updateDates: (dates) => dispatch(actions.updateDates(dates)),
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  render() {
    const { activeDay, activeActivity, days, updateDates, updateActivity } = this.props;
    const { id, date, colors, activity, happiness, productivity } = days.filter(day => day.id === activeDay.id)[0]
      .activities.filter(activity => activity.id === activeActivity.id)[0];
      
    return (
      <div
        className="new-activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="date">
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => updateDates({ id: activeDay.id, date: e.target.value })}
            />
          </div>
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            value={activity}
            placeholder="Today I..."
            onChange={(e) => updateActivity({ activity: e.target.value })}
            style={{ backgroundColor: colors.input, border: `solid ${colors.border}` }}
          />
          <Box />
        </form>
      </div>
    );
  }
});
