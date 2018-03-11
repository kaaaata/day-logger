import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import _ from 'lodash';
import Box from './Box';
import './NewActivity.css';

const mapStateToProps = (state) => ({ activeActivity: state.default.activeActivity, days: state.default.days });
const mapDispatchToProps = (dispatch) => ({
  updateDates: (dates) => dispatch(actions.updateDates(dates)),
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  componentWillMount() {
    console.log(this.props.activeActivity);
  }
  render() {
    const { dayID, updateDates, updateActivity } = this.props;
    const { id, date, colors, activity, happiness, productivity } = _.flatten(this.props.days.map(day => day.activities))
      .filter(activity => activity.id === this.props.activeActivity.id)[0];

    return (
      <div className="new-activity" style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}>
        <form onSubmit={(e) => {}}>
          <div className="date">
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => updateDates({ id: dayID, date: e.target.value })}
            />
          </div>
        </form>
        <form onSubmit={(e) => {}}>
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
