import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BoxMini from './BoxMini';
import './styles/DayMini.css';

const mapStateToProps = (state) => ({
  activeDay: state.default.activeDay,
});
const mapDispatchToProps = (dispatch) => ({
  updateActiveDay: (day) => dispatch(actions.updateActiveDay(day)),
  deleteDay: (day) => dispatch(actions.deleteDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class DayMini extends Component {
  render() {
    const { id, date, colors, happiness, productivity, updateActiveDay, deleteDay } = this.props;

    return (
      <div className="day-mini">
        <Link className="link" to={"/day/" + id}>
          <div
            className="container"
            style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
            onClick={(e) => { // don't need e.target === e.currentTarget here because activeDay will be changed onClick anyway
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
