import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Activity from './Activity';
import Meter from './Meter';
import './styles/Day.css';

const mapStateToProps = (state) => ({ 
  activeDay: state.default.activeDay,
  activeActivity: state.default.activeActivity,
  activities: state.default.activities.filter(activity => activity.day === state.default.activeDay.id),
  days: state.default.days,
  date: state.default.days.filter(day => day.id === state.default.activeDay.id)[0].date,
});
const mapDispatchToProps = (dispatch) => ({
  updateDate: (date) => dispatch(actions.updateDate(date)),
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
  addActivity: () => dispatch(actions.addActivity()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Day extends Component {
  onMeterClick(meter, e) {
    // translate the position of the user's click to a percentage value for happiness
    const y = e.nativeEvent.offsetY;
    if (y >= 0 && y <= 200) this.props.updateActivity({ happiness: 100 - ~~(y / 2) });
  }

  render() {
    const {
      activeDay, activeActivity, activities, days, date, updateDate, updateActivity, addActivity,
    } = this.props;
    const { colors, activity } = activities.filter(activity => activity.id === activeActivity.id)[0];

    return (
      <section className="day">
        <article className="nav">
          <button onClick={() => addActivity() }>
            +New Activity
          </button>
          <Link className="link" to="/calendar">
            <button>
              Back
            </button>
          </Link>
        </article>
        <article className="day-content">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => updateDate({ date: e.target.value })}
            />
          </form>
          <section
            className="activities-container"
            style={{
              backgroundColor: days.filter(day => day.id === activeDay.id)[0].colors.body,
            }}
          >
            {activities.map((activity, index) => (
              <Activity key={index} {...activity} />
            ))}
          </section>
          <section className="bottom">
            <form onSubmit={(e) => e.preventDefault()}>
              <article
                className="activity"
                style={{ backgroundColor: colors.input, border: `solid ${colors.border}` }}
              >
                <input
                  value={activity}
                  placeholder="Today I..."
                  onChange={(e) => updateActivity({ activity: e.target.value })}
                />
              </article>
            </form>
            <Meter data="happiness" />
            <Meter data="productivity" />
          </section>
        </article>
      </section>
    );
  }
});
