import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './Activity.css';

const mapDispatchToProps = (dispatch) => ({ updateNewActivity: (updates) => dispatch(actions.updateNewActivity(updates)) });

export default connect(null, mapDispatchToProps)(class Activity extends Component {
  render() {
    const { date, activity, colors, happiness, productivity, updateNewActivity } = this.props;

    return (
      <div
        className="activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={() => {
          updateNewActivity({ activity, colors, happiness, productivity });
        }}
      >
        <div className="content">
          {activity}
        </div>
      </div>
    );
  }
});
