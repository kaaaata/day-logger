import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BoxMini from './BoxMini';
import './styles/Activity.css';

const mapStateToProps = (state) => ({
  activeDay: state.default.activeDay,
  activities: state.default.activities,
});
const mapDispatchToProps = (dispatch) => ({ 
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
  deleteActivity: (activity) => dispatch(actions.deleteActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Activity extends Component {
  render() {
    const { id, activity, colors, happiness, productivity, activeDay, activities, updateActiveActivity, deleteActivity } = this.props;

    return (
      <section
        className="activity"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={(e) => {
          if (e.target === e.currentTarget) updateActiveActivity({ id });
        }}
      >
        <article
          className="x"
          style={{ backgroundColor: colors.border, border: `solid ${colors.border}` }}
          onClick={(e) => {
            if (e.target === e.currentTarget && activities.filter(activity => activity.day === activeDay.id).length > 1) deleteActivity({ id });
          }}
        >
          x
        </article>
        <article
          className="content"
          onClick={(e) => updateActiveActivity({ id })}
        >
          {activity.length ? activity : 'Blank Activity'}
        </article>
        <article onClick={(e) => updateActiveActivity({ id })}>
          <BoxMini {...this.props} />
        </article>
      </section>
    );
  }
});
