import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './NewActivity.css';

const mapStateToProps = (state) => ({ newActivity: state.default.newActivity });
const mapDispatchToProps = (dispatch) => ({
  addNewActivity: (newActivity) => dispatch(actions.addNewActivity(newActivity)),
  updateDates: (dates) => dispatch(actions.updateDates(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class NewActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      dateColors: { body: 'transparent', border: 'transparent' },
      activity: '',
    };
  }

  handleSubmitDate(e) {
    // e.preventDefault();
    this.props.updateDates({ oldDate: this.props.date, newDate: this.state.date });
  }

  handleSubmitActivity(e) {
    e.preventDefault();
    this.props.addNewActivity({ date: this.state.date, ...this.props.newActivity, activity: this.state.activity });
  }

  render() {
    const { date, dateColors, activity } = this.state;
    const { updateDates } = this.props;
    const { colors } = this.props.newActivity;

    return (
      <div className="new-activity" style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}>
        <form onSubmit={(e) => this.handleSubmitDate(e)}>
          <div className="date">
            <input
              className="date"
              value={date}
              placeholder="Today is..."
              onChange={(e) => this.setState({ date: e.target.value })}
              onFocus={() => this.setState({ dateColors: this.props.newActivity.colors })}
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
            onChange={(e) => this.setState({ activity: e.target.value })}
            style={{ backgroundColor: colors.input, border: `solid ${colors.border}` }}
          />
          <div>
            <button type="submit">Done</button>
          </div>
        </form>
      </div>
    );
  }
});
