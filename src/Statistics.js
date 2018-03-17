import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Statistics.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
  activities: state.default.activities,
  statistics: state.default.statistics,
});

export default connect(mapStateToProps)(class Statistics extends Component {
  render() {
    const { days, activities, statistics } = this.props;

    return (
      <div className="statistics">
        Happiness scores for all days: {JSON.stringify(days.map(day => day.happiness))}
        Productivity scores for all dsys: {JSON.stringify(days.map(day => day.productivity))}
        Average happiness per day: {statistics.happiness.average}
        Average productivity per day: {statistics.productivity.average}
      </div>
    );
  }
});
