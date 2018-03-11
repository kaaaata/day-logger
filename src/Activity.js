import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './Activity.css';

const mapDispatchToProps = (dispatch) => ({ 
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
  deleteActivity: (activity) => dispatch(actions.deleteActivity(activity)),
});

export default connect(null, mapDispatchToProps)(class Activity extends Component {
  render() {
    const { id, date, activity, colors, happiness, productivity, updateActiveActivity, deleteActivity } = this.props;

    return (
      <div
        className="activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            console.log('updating active activity');
            updateActiveActivity({ id });
          }
        }}
      >
        <div
          className="x"
          style={{ backgroundColor: colors.border, border: `solid ${colors.border}` }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log('deleting an activity');
              deleteActivity({ id });
            }
          }}
        >
          x
        </div>
        <div className="content">
          {activity}
        </div>
      </div>
    );
  }
});
