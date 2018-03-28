import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import axios from 'axios';
import './styles/Header.css';

const mapStateToProps = (state) => ({
  activeUsername: state.default.activeUsername,
  days: state.default.days.map(day => ({ ...day, colors: JSON.stringify(day.colors) })),
  activities: state.default.activities.map(activity => ({ ...activity, colors: JSON.stringify(activity.colors) })),
  saved: state.default.saved,
});
const mapDispatchToProps = (dispatch) => ({
  save: () => dispatch(actions.save()),
  calculateStatistics: () => dispatch(actions.calculateStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  async onSave() {
    const { activeUsername, days, activities, save } = this.props;
    await axios.post(`/persistDaysAndActivitiesForUsername/${activeUsername}`, { days, activities });
    save();
  }

  render() {
    const { saved, calculateStatistics } = this.props;

    return (
      <div className="header">        
        <Link className="link" to="/days"><button>Calendar</button></Link>
        <Link className="link" to="/statistics"><button onClick={() => calculateStatistics()}>Statistics</button></Link>
        <button onClick={() => this.onSave()} style={{ borderBottom: saved ? 'none' : '3px solid yellow' }}>Save</button>
        <Link className="link" to="/"><button>Logout</button></Link>
      </div>
    );
  }
});
