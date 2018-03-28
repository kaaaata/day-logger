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
      <section className="statistics">
        <article>Happiness across all days: <figure>{statistics.happiness.percentages.join(' - ')}</figure></article>
        <article>Productivity across all days: <figure>{statistics.productivity.percentages.join(' - ')}</figure></article>
        <article>Average happiness: <figure>{statistics.happiness.average}</figure></article>
        <article>Average productivity: <figure>{statistics.productivity.average}</figure></article>
      </section>
    );
  }
});
