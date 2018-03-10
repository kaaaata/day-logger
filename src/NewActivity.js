import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Box from './Box';
import './NewActivity.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
  newActivity: state.default.newActivity
});
const mapDispatchToProps = (dispatch) => ({
  addNewActivity: (newActivity) => dispatch(actions.addNewActivity(newActivity)),
  updateNewActivity: (updates) => dispatch(actions.updateNewActivity(updates)),
  updateDates: (dates) => dispatch(actions.updateDates(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      dateColors: { body: 'transparent', border: 'transparent' },
    };
  }

  componentDidMount() {
    console.log('short id got this one: ', this.props.id);
    this.props.updateNewActivity({
      activity: this.props.days.filter(day => day.date === this.props.date)[0].activities[0].activity || '',
    });
  }

  handleSubmitDate(e) {
    // don't know why e.preventDefault() throws error 'e is undefined'
    // e.preventDefault();
    this.props.updateDates({ oldDate: this.props.date, newDate: this.state.date });
  }

  handleSubmitActivity(e) {
    e.preventDefault();
    this.props.addNewActivity({ date: this.state.date, ...this.props.newActivity, activity: this.state.activity });
  }

  render() {
    const { date, dateColors } = this.state;
    const { day, updateDates, updateNewActivity } = this.props;
    const { activity, colors } = this.props.newActivity;

    return (
      <div className="new-activity" style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}>
        <form onSubmit={(e) => this.handleSubmitDate(e)}>
          <div className="date">
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => this.setState({ date: e.target.value })}
              onFocus={() => this.setState({ dateColors: colors })}
              onBlur={() => this.setState({ dateColors: { body: 'transparent', border: 'transparent' }},
                (e) => this.handleSubmitDate(e))}
              style={{ backgroundColor: dateColors.body, border: `solid ${dateColors.border}` }}
            />
          </div>
        </form>
        <form onSubmit={(e) => this.handleSubmitActivity(e)}>
          <input
            value={activity}
            placeholder="Today I..."
            onChange={(e) => updateNewActivity({ activity: e.target.value })}
            style={{ backgroundColor: colors.input, border: `solid ${colors.border}` }}
          />
          <Box />
          <div>
            <button type="submit">Done</button>
          </div>
        </form>
      </div>
    );
  }
});
