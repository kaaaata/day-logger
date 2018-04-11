import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import _ from 'lodash';
import DayMini from './DayMini';
import './styles/Calendar.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({
  addDay: () => dispatch(actions.addDay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Days extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
    };
  }

  render() {
    const { days, addDay } = this.props;
    const { page } = this.state;

    // max # pages
    const max = Math.ceil(days.length / 20);

    return (
      <section className="calendar">
        <section className="nav">
          <section className="top">
            <button className="new-day" onClick={() => addDay()}>
              +New Day
            </button>
            <button onClick={() => this.setState({ page: page === 0 ? 0 : page - 1 })}>
              Prev
            </button>
            <button onClick={() => this.setState({ page: page === max - 1 ? max - 1 : page + 1 })}>
              Next
            </button>
            <button onClick={() => this.setState({ page: 0 })}>
              First
            </button>
            <button onClick={() => this.setState({ page: max - 1 })}>
              Last
            </button>
          </section>
          <section className="bottom">
            <button>
              Page: {page + 1} / {max}
            </button>
          </section>
        </section>
        <article className="days-container">
          <div
            className="slideshow-container"
            style={{ // 879 is super spaghetti code but it looks good
              width: (max + 1) * 879 + 'px',
              marginLeft: page * -879 + 'px',
            }}
          >
            {_.chunk(days, 20).map((chunk, index) => (
              <section key={index} className="twenty-four-days">
                {chunk.map((day, index) => (
                  <DayMini key={index} {...day} />
                ))}
              </section>
            ))}
          </div>
        </article>
      </section>
    );
  }
});
