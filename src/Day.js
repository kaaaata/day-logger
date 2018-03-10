import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Activity from './Activity';
import NewActivity from './NewActivity';
import './Day.css';

export default class Day extends Component {
  render() {
    const { id, date, colors, activities } = this.props;

    return (
      <div className="day">
        <div className="activities-container">
          {activities.map((activity, index) => (
            <Activity key={index} {...activity} />
          ))}
          {!activities.length && (
            <div className="no-activities">I've done nothing today yet.</div>
          )}
        </div>
        <div className="new-activity">
          <NewActivity date={date} id={id} />
        </div>
      </div>
    );
  }
};
