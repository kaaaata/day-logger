import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scatterplot } from './functions';
import './styles/Statistics.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
  activities: state.default.activities,
  statistics: state.default.statistics,
});

export default connect(mapStateToProps)(class Statistics extends Component {
  componentDidMount() {
    const { statistics } = this.props;

    const happiness = scatterplot({
      id: 'happiness',
      data: statistics.happiness.percentages.map((point, index) => ({ x: index + 1, y: point })),
      label: 'Happiness Ratings',
      x: {
        label: 'Day',
        min: 0,
        max: 50,
        step: 5,
      },
      y: {
        label: 'Happiness (%)',
        min: 0,
        max: 100,
        step: 10,
      },
    });
    const productivity = scatterplot({
      id: 'productivity',
      data: statistics.happiness.percentages.map((point, index) => ({ x: index + 1, y: point })),
      label: 'Productivity Ratings',
      x: {
        label: 'Day',
        min: 0,
        max: 50,
        step: 5,
      },
      y: {
        label: 'Productivity (%)',
        min: 0,
        max: 100,
        step: 10,
      },
    });
  }

  render() {
    const { days, activities, statistics } = this.props;

    return (
      <section className="statistics">        
        <figure>
          <figcaption>Your Happiness (Average {statistics.happiness.average})</figcaption>
          <div className="graph-container">
            <canvas id="happiness"></canvas>
          </div>  
        </figure>
        <figure>
          <figcaption>Your Productivity (Average {statistics.productivity.average})</figcaption>
          <div className="graph-container">
            <canvas id="productivity"></canvas>
          </div>  
        </figure>
      </section>
    );
  }
});
