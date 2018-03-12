import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import DayMini from './DayMini';
import * as functions from './functions';
import './styles/Days.css';

const mapStateToProps = (state) => ({ days: state.default.days });
const mapDispatchToProps = (dispatch) => ({ addDay: () => dispatch(actions.addDay()) });

export default connect(mapStateToProps, mapDispatchToProps)(class Days extends Component {
  render() {
    const { days, addDay } = this.props;

    return (
      <div className="days">
        <div onClick={() => addDay()}>
          <div className="new-day">
            <div className="content">
              +New Day
            </div>
          </div>
        </div>
        {days.map((day, index) => (
          <DayMini key={index} {...day} />
        ))}
      </div>
    );
  }
});
