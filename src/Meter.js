import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './styles/Meter.css';

const mapStateToProps = (state) => ({
  activeActivity: state.default.activeActivity,
  activities: state.default.activities.filter(activity => activity.day === state.default.activeDay.id),
});
const mapDispatchToProps = (dispatch) => ({
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Meter extends Component {
  onMeterClick(e) {
    // translate the position of the user's click to a percentage value for happiness
    const { data, updateActivity } = this.props;
    const y = e.nativeEvent.offsetY;
    if (y >= 0 && y <= 200) {
      if (data === 'happiness') updateActivity({ happiness: 100 - ~~(y / 2) });
      if (data === 'productivity') updateActivity({ productivity: 100 - ~~(y / 2) });
    }
  }

  render() {
    const { data, activeActivity, activities } = this.props;
    const { colors, happiness, productivity } = activities.filter(activity => activity.id === activeActivity.id)[0];

    return (
      <article className="meter">
        <section className="title">{data === 'happiness' ? 'Happiness' : 'Productivity'}</section>
        <section
          className="click-area"
          onClick={(e) => this.onMeterClick(e)}
        />
        <section
          className="meter"
          style={{ border: `solid ${colors.border}` }}
        >
          <div
            className="filler"
            style={{ backgroundColor: colors.input, marginTop: 200 - (data === 'happiness' ? happiness : productivity) * 2 }}
          />
        </section>
      <section className="percentage">{data === 'happiness' ? happiness : productivity}%</section>  
    </article>            
    );
  }
});
