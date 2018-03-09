import React, { Component } from 'react';
import './DayMini.css';

export default class DayMini extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { date, colors, activities} = this.props;

    return (
      <div className="day-mini" style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}>
        <div className="content">
          {date.length ? date : 'A New Day'}
        </div>
      </div>
    );
  }
};
