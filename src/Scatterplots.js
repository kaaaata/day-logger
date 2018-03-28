import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scatterplot } from './functions';
import './styles/Scatterplots.css';

const mapStateToProps = (state) => ({
  statistics: state.default.statistics,
});

export default connect(mapStateToProps)(class Statistics extends Component {
  renderGraphs() {
    const { toggle, statistics } = this.props;
    const happiness = statistics.happiness.percentages;
    const productivity = statistics.productivity.percentages;
    
    if (toggle === 'raw') {
      const happinessRaw = scatterplot({
        id: 'happiness-raw',
        data: happiness.map((point, index) => ({ x: index + 1, y: point })),
        label: 'Happiness Ratings',
        x: { label: 'Day', min: 0, max: 50, step: 5 },
        y: { label: 'Happiness (%)', min: 0, max: 100, step: 10 },
      });
      const productivityRaw = scatterplot({
        id: 'productivity-raw',
        data: productivity.map((point, index) => ({ x: index + 1, y: point })),
        label: 'Productivity Ratings',
        x: { label: 'Day', min: 0, max: 50, step: 5 },
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
        x: { label: 'Day', min: 0, max: 50, step: 5 },
        y: { label: 'Happiness Differences (%)', min: -100, max: 100, step: 20 },
      });
      const productivityDifference = scatterplot({
        id: 'productivity-difference',
        data: productivity.slice(1).map((point, index) => ({ x: index + 1, y: productivity[index + 1] - productivity[index] })),
        label: 'Productivity Ratings Differences',
        x: { label: 'Day', min: 0, max: 50, step: 5 },
        y: { label: 'Productivity Differences (%)', min: -100, max: 100, step: 20 },
      });
    }
  }

  componentDidMount() {
    this.renderGraphs();
  }

  componentDidUpdate() {
    this.renderGraphs();  
  }

  render() {
    const { happinessTitle, happinessId, productivityTitle, productivityId } = this.props;

    return (
      <section className="scatterplots">
        <figure>
          <figcaption>{happinessTitle}</figcaption>
          <div className="graph-container">
            <canvas id={happinessId}></canvas>
          </div>  
        </figure>
        <figure>
          <figcaption>{productivityTitle}</figcaption>
          <div className="graph-container">
            <canvas id={productivityId}></canvas>
          </div>  
        </figure>
      </section>
    );
  }
});
