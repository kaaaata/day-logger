import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Activity from './Activity';
import NewActivity from './NewActivity';
import './styles/Day.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  days: state.default.days,
  activities: state.default.activities,
});
const mapDispatchToProps = (dispatch) => ({
  addActivity: () => dispatch(actions.addActivity()),
  updateActiveActivity: (activity) => dispatch(actions.updateActiveActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Day extends Component {
  componentWillMount() {
    const { activeDay, updateActiveActivity } = this.props;
    const activities = this.props.activities.filter(activity => activity.day === activeDay.id);
    updateActiveActivity({ id: activities.filter(activity => activity.day === activeDay.id)[0].id });
  }

  render() {
    const { activeDay, days, addActivity } = this.props;
    const activities = this.props.activities.filter(activity => activity.day === activeDay.id);
    
    return (
      <section className="day">
        <article
          className="activities-container"
          style={{
            backgroundColor: days.filter(day => day.id === activeDay.id)[0].colors.body,
          }}
        >
          <div onClick={() => addActivity() }>
            <div className="new-activity">
              <div className="content">
                +New Activity
              </div>
            </div>
          </div>
          {activities.map((activity, index) => (
            <Activity key={index} {...activity} />
          ))}
        </article>
        <article className="new-activity">
          <NewActivity />
        </article>
      </section>
    );
  }
});
