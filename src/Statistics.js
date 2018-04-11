import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Charts from './Charts';
import './styles/Statistics.css';

const mapStateToProps = (state) => ({
  statistics: state.default.statistics,
});
const mapDispatchToProps = (dispatch) => ({
  calculateStatistics: () => dispatch(actions.calculateStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Statistics extends Component {
  constructor(props) {
    super(props);
    const { statistics } = this.props;
    this.state = {
      toggle: 'donut',
      happinessTitle: `Happy Days vs. Sad Days (${statistics.figures.happy} - ${statistics.figures.sad})`,
      happinessId: 'happiness-donut',
      productivityTitle: `Productive Days vs. Lazy Days (${statistics.figures.productive} - ${statistics.figures.lazy})`,
      productivityId: 'productivity-donut',
    };
  }

  componentWillMount() {
    this.props.calculateStatistics();
  }

  handleDropdown(e) {
    const { statistics } = this.props;

    if (e.target.value === 'donut') {
      this.setState({
        toggle: e.target.value,
        happinessTitle: `Happy Days vs. Sad Days (${statistics.figures.happy} - ${statistics.figures.sad})`,
        happinessId: 'happiness-donut',
        productivityTitle: `Productive Days vs. Lazy Days (${statistics.figures.productive} - ${statistics.figures.lazy})`,
        productivityId: 'productivity-donut',
      });
    } else if (e.target.value === 'raw') {
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
        <article className="dropdown">
          Data Type: <select onChange={(e) => this.handleDropdown(e)}>
          <optgroup label="Basic Stats">
              {[
                { analysis: 'Pie Chart', toggle: 'donut' },
                { analysis: 'Scatterplot', toggle: 'raw' },
              ].map(dropdown => (
                <option key={dropdown.analysis} value={dropdown.toggle}>{dropdown.analysis}</option>
              ))}
            </optgroup>
            <optgroup label="Time Series">
              {[
                { analysis: '1st Lag', toggle: 'lag1' },
                { analysis: '1st Difference', toggle: 'difference' },
              ].map(dropdown => (
                <option key={dropdown.analysis} value={dropdown.toggle}>{dropdown.analysis}</option>
              ))}
            </optgroup>
          </select>
        </article>
        <Charts
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
