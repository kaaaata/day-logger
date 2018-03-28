import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scatterplots from './Scatterplots';
import './styles/Statistics.css';

const mapStateToProps = (state) => ({
  statistics: state.default.statistics,
});

export default connect(mapStateToProps)(class Statistics extends Component {
  constructor(props) {
    super(props);
    const { statistics } = this.props;
    this.state = {
      toggle: 'raw',
      happinessTitle: `Your Happiness (Average ${statistics.happiness.average})`,
      happinessId: 'happiness-raw',
      productivityTitle: `Your Productivity (Average ${statistics.productivity.average})`,
      productivityId: 'productivity-raw',
    };
  }

  handleDropdown(e) {
    const { statistics } = this.props;

    if (e.target.value === 'raw') {
      this.setState({
        toggle: e.target.value,
        happinessTitle: `Your Happiness (Average ${statistics.happiness.average})`,
        happinessId: 'happiness-raw',
        productivityTitle: `Your Productivity (Average ${statistics.productivity.average})`,
        productivityId: 'productivity-raw',
      });
    } else if (e.target.value === 'lag1') {
      this.setState({
        toggle: e.target.value, 
        happinessTitle: 'Happiness vs. Happiness Lag 1',
        happinessId: 'happiness-lag1',
        productivityTitle: 'Productivity vs. Productivity Lag 1',
        productivityId: 'productivity-lag1',
      });
    } else if (e.target.value === 'difference') {
      this.setState({
        toggle: e.target.value, 
        happinessTitle: 'Happiness Differences',
        happinessId: 'happiness-difference',
        productivityTitle: 'Productivity Differences',
        productivityId: 'productivity-difference',
      });
    }
  }

  render() {
    const { toggle, happinessTitle, happinessId, productivityTitle, productivityId } = this.state;

    return (
      <section className="statistics">
        <select onChange={(e) => this.handleDropdown(e)}>
          {[
            { analysis: 'Raw', toggle: 'raw' },
            { analysis: 'Lag 1', toggle: 'lag1' },
            { analysis: 'Differenced', toggle: 'difference' },
          ].map(dropdown => (
            <option key={dropdown.analysis} value={dropdown.toggle}>{dropdown.analysis}</option>
          ))}
        </select>
        <Scatterplots
          toggle={toggle}
          happinessTitle={happinessTitle}
          happinessId={happinessId}
          productivityTitle={productivityTitle}
          productivityId={productivityId}
        />
        </section>
    );
  }
});
