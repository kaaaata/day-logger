import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BoxMini from './BoxMini';
import './styles/DayMini.css';

const mapStateToProps = (state) => ({ 
  days: state.default.days,
  activeDay: state.default.activeDay,
});
const mapDispatchToProps = (dispatch) => ({
  updateActiveDay: (day) => dispatch(actions.updateActiveDay(day)),
  deleteDay: (day) => dispatch(actions.deleteDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class DayMini extends Component {
  render() {
    const { id, date, colors, activities, happiness, productivity, updateActiveDay, deleteDay, days } = this.props;

    return (
      <div
        className="day-mini"
        // onMouseOver={(e) => {
        //   updateActiveDay({ id });
        //   console.log('active day: ', this.props.activeDay);
        // }}
      >
        <Link className="link" to={"/day/" + id}>
          <div
            className="container"
            style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
            onClick={(e) => {
              updateActiveDay({ id });
            }}
          >
            <div className="content">
              {date.length ? date : 'A New Day'}
            </div>
            <BoxMini {...this.props} />
          </div>
        </Link>
        <div
          className="x"
          style={{ backgroundColor: colors.border, border: `solid ${colors.border}` }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              deleteDay({ id });
            }
          }}
        >
          x
        </div>
      </div>
    );
  }
});
