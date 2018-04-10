import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scatterplot } from './functions';
import './styles/Scatterplots.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
  statistics: state.default.statistics,
});

export default connect(mapStateToProps)(class Statistics extends Component {
  nextMultipleOf10(num) {
    while (true) {
      if (num % 10 === 0) return num;
      num++;
    }
  }

  renderGraphs() {
    const { toggle, days, statistics } = this.props;
    const happiness = statistics.happiness.percentages;
    const productivity = statistics.productivity.percentages;

    // dynamic x-axis max value and step size depending on number of days
    const max = this.nextMultipleOf10(days.length);
    const step = days.length <= 10 ? 1 : (days.length <= 50 ? 5 : 10);
    
    if (toggle === 'raw') {
      const happinessRaw = scatterplot({
        id: 'happiness-raw',
        data: happiness.map((point, index) => ({ x: index + 1, y: point })),
        label: 'Happiness Ratings',
        x: { label: 'Day', min: 0, max, step },
        y: { label: 'Happiness (%)', min: 0, max: 100, step: 10 },
      });
      const productivityRaw = scatterplot({
        id: 'productivity-raw',
        data: productivity.map((point, index) => ({ x: index + 1, y: point })),
        label: 'Productivity Ratings',
        x: { label: 'Day', min: 0, max, step },
        y: { label: 'Productivity (%)', min: 0, max: 100, step: 10 },
      });
    } else if (toggle === 'lag1') {
      const happinessLag1 = scatterplot({
        id: 'happiness-lag1',
        data: happiness.slice(1).map((point, index) => ({ x: point, y: happiness[index] })),
        label: 'Happiness Ratings',
        x: { label: 'Happiness (%)', min: 0, max: 100, step: 10 },
        y: { label: 'Happiness Lag 1(%)', min: 0, max: 100, step: 10 },
      });
      const productivityLag1 = scatterplot({
        id: 'productivity-lag1',
        data: productivity.slice(1).map((point, index) => ({ x: point, y: productivity[index] })),
        label: 'Productivity Ratings',
        x: { label: 'Productivity (%)', min: 0, max: 100, step: 10 },
        y: { label: 'Productivity Lag 1(%)', min: 0, max: 100, step: 10 },
      });
    } else if (toggle === 'difference') {
      const happinessDifference = scatterplot({
        id: 'happiness-difference',
        data: happiness.slice(1).map((point, index) => ({ x: index + 1, y: happiness[index + 1] - happiness[index] })),
        label: 'Happiness Ratings Differences',
        x: { label: 'Day', min: 0, max, step },
        y: { label: 'Happiness Differences T1-T0 (%)', min: -100, max: 100, step: 20 },
      });
      const productivityDifference = scatterplot({
        id: 'productivity-difference',
        data: productivity.slice(1).map((point, index) => ({ x: index + 1, y: productivity[index + 1] - productivity[index] })),
        label: 'Productivity Ratings Differences',
        x: { label: 'Day', min: 0, max, step },
        y: { label: 'Productivity Differences T1-T0 (%)', min: -100, max: 100, step: 20 },
      });
    }
  }

  componentDidMount() {
    this.renderGraphs();
  }

  componentDidUpdate() {
    this.renderGraphs();
    console.log('toggle: ', this.props.toggle);
  }

  render() {
    const { happinessTitle, happinessId, productivityTitle, productivityId } = this.props;

    return (
      <section className="scatterplots">
        <figure>
          <figcaption>{happinessTitle}</figcaption>
          <canvas id={happinessId}></canvas>
        </figure>
        <figure>
          <figcaption>{productivityTitle}</figcaption>
          <canvas id={productivityId}></canvas>
        </figure>
      </section>
    );
  }
});
