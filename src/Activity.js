import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './Activity.css';

const mapDispatchToProps = (dispatch) => ({ updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)) });

export default connect(null, mapDispatchToProps)(class Activity extends Component {
  render() {
    const { id, date, activity, colors, happiness, productivity, updateActiveActivity } = this.props;

    return (
      <div
        className="activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={() => {
          console.log('I CLICKED AN ACTIVITY');
          console.log('updating new activity id=', id);
          updateActiveActivity({ id });
        }}
      >
        <div className="content">
          {activity}
        </div>
      </div>
    );
  }
});
