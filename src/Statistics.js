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
    const happiness = days.map(day => ~~(day.happiness * 100 / 75));
    const productivity = days.map(day => ~~(day.productivity * 100 / 75));

    return (
      <section className="statistics">
        <article>Your happiness across all days: {happiness.map(item => item + '%').join(' - ')}</article>
        <article>Your productivity across all days: {happiness.map(item => item + '%').join(' - ')}</article>
        <article>Average happiness: {~~(happiness.reduce((a, b) => a + b) / happiness.length)}%</article>
        <article>Average productivity: {~~(productivity.reduce((a, b) => a + b) / productivity.length)}%</article>
      </section>
    );
  }
});
