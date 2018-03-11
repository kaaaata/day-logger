import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './DayMini.css';

const mapDispatchToProps = (dispatch) => ({ updateActiveDay: (day) => dispatch(actions.updateActiveDay(day)) });

export default connect(null, mapDispatchToProps)(class DayMini extends Component {
  render() {
    const { id, date, colors, activities, happiness, productivity, updateActiveDay } = this.props;

    return (
      <div
        className="day-mini"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
        onClick={() => updateActiveDay({ id })}
      >
        <div className="content">
          {date.length ? date : 'A New Day'}
        </div>
      </div>
    );
  }
});
