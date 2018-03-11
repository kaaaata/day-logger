import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from './redux/actions';
import BoxMini from './BoxMini';
import './Activity.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({ 
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
  deleteActivity: (activity) => dispatch(actions.deleteActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Activity extends Component {
  render() {
    const {
      id, date, activity, colors, happiness, productivity, activeDay, days, updateActiveActivity, deleteActivity,
    } = this.props;

    return (
      <div
        className="activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={(e) => {
          if (e.target === e.currentTarget) updateActiveActivity({ id });
        }}
      >
        <div
          className="x"
          style={{ backgroundColor: colors.border, border: `solid ${colors.border}` }}
          onMouseOver={() => console.log(days, activeDay.id)}
          onClick={(e) => {
            if (e.target === e.currentTarget && days.filter(day => day.id === activeDay.id)[0].activities.length > 1) {
              deleteActivity({ id });
            }
          }}
        >
          x
        </div>
        <div className="content">
          {activity}
        </div>
        <BoxMini {...this.props} />
      </div>
    );
  }
});
