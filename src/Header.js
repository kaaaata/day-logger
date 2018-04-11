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
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Calendar',
    };
  }

  async onSave() {
    const { activeUsername, days, activities, save } = this.props;
    await axios.post(`/persistDaysAndActivitiesForUsername/${activeUsername}`, { days, activities });
    save();
  }

  render() {
    const { saved, calculateStatistics } = this.props;
    const { title } = this.state;

    return (
      <section className="header">
        <article className="title">
          <u>{title}</u>
        </article>
        <article>
          <Link className="link" to="/days">
            <button onClick={() => this.setState({ title: 'Calendar' })}>Calendar</button>
          </Link>
        </article>
        <article>
          <Link className="link" to="/statistics">
            <button onClick={() => this.setState({ title: 'Statistics' })}>Statistics</button>
          </Link>
        </article>
        <article>
          <button onClick={() => this.onSave()} style={{ border: saved ? 'none' : 'solid yellow' }}>Save</button>
        </article>
        <article>
          <Link className="link" to="/">
            <button>Logout</button>
          </Link>
        </article>
      </section>
    );
  }
});
