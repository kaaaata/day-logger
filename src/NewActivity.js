import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Box from './Box';
import './styles/NewActivity.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  activeActivity: state.default.activeActivity,
  activities: state.default.activities,
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({
  updateDate: (date) => dispatch(actions.updateDate(date)),
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  render() {
    const { activeDay, activeActivity, activities, days, updateDate, updateActivity } = this.props;
    const { date } = days.filter(day => day.id === activeDay.id)[0];
    const { colors, activity } = activities.filter(activity => activity.id === activeActivity.id)[0];
      
    return (
      <section
        className="new-activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <article className="date">
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => updateDate({ date: e.target.value })}
            />
          </article>
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
      </section>
    );
  }
});
