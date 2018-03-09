import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import DayMini from './DayMini';
import * as functions from './functions';
import './Days.css';

const mapStateToProps = (state) => ({ days: state.default.days });
const mapDispatchToProps = (dispatch) => ({ addDay: (day) => dispatch(actions.addDay(day)) });

export default connect(mapStateToProps, mapDispatchToProps)(class Days extends Component {
  render() {
    const { days, addDay } = this.props;

    return (
      <div className="days">
        <div onClick={() => addDay({ date: '', colors: functions.randomCircleColors(), activities: [] })}>
          <div className="new-day">
            <div className="content">
              +New Day
            </div>
          </div>
        </div>
        {days.map((day, index) => (
          <Link key={index} className="link" to={"/day/" + index}><DayMini key={index} {...day} /></Link>
        ))}
      </div>
    );
  }
});
