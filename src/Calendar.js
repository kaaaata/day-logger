import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import _ from 'lodash';
import DayMini from './DayMini';
import './styles/Calendar.css';

const mapStateToProps = (state) => ({
  page: state.default.page,
  days: state.default.days,
});
const mapDispatchToProps = (dispatch) => ({
  updatePage: (page) => dispatch(actions.updatePage(page)),
  addDay: () => dispatch(actions.addDay()),
  calculateStatistics: () => dispatch(actions.calculateStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Days extends Component {
  componentWillMount() {
    this.props.calculateStatistics();
  }

  render() {
    const { page, days, updatePage, addDay } = this.props;

    // max # pages
    const max = Math.ceil(days.length / 20);

    return (
      <section className="calendar">
        <section className="nav">
          <section className="top">
            <button className="new-day" onClick={() => {
              if (days.length % 20 === 0) updatePage(page + 1);
              addDay();
            }}>
              +New Day
            </button>
            <button onClick={() => updatePage(page === 0 ? 0 : page - 1)}>
              Prev
            </button>
            <button onClick={() => updatePage(page === max - 1 ? max - 1 : page + 1)}>
              Next
            </button>
            <button onClick={() => updatePage(0)}>
              First
            </button>
            <button onClick={() => updatePage(max - 1)}>
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
            {_.chunk(days.concat(Array(20).fill(null)), 20).map((chunk, index) => (
              <section key={index} className="twenty-days">
                {chunk.map((day, index) => (
                  <div key={index}>
                    {day && <DayMini key={index} {...day} />}
                    {!day && <div className="blank" />}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </article>
      </section>
    );
  }
});
