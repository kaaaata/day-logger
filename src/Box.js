import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './styles/Box.css';

const mapStateToProps = (state) => ({ 
  activeActivity: state.default.activeActivity,
  activities: state.default.activities,
});
const mapDispatchToProps = (dispatch) => ({
  updateActivity: (activity) => dispatch(actions.updateActivity(activity)),
  calculateStatistics: () => dispatch(actions.calculateStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Box extends Component {
  onBoxClick(e) {
    const { updateActivity, calculateStatistics } = this.props;
    const x = e.nativeEvent.offsetX - 8;
    const y = e.nativeEvent.offsetY - 8;
    // the box is 158px by 158px, the extra 8px is to align the happiness/productivity dart with the cursor pointer tip.
    // it is > 0 instead of >= 0 to avoid some weird glitch with double clicking the dart causing x=0, y=0
    if (x > 0 && y > 0 && x <= 150 && y <= 150) {
      console.log('x = ', x);
      console.log('y = ', y);
      updateActivity({ happiness: y, productivity: x })
      calculateStatistics();
    };
  }

  render() {
    const { activeActivity, activities } = this.props;
    const { colors, happiness, productivity } = activities.filter(activity => activity.id === activeActivity.id)[0];

    return (
      <div
        className="box"
        onClick={(e) => this.onBoxClick(e)}
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <div
          className="dart"
          style={{ left: productivity, top: happiness, backgroundColor: 'black' }}
        />
        <div className="emoji-grid">
          {['smiling', 'dizzy', 'zany', 'crying'].map((emoji, index) => (
            <div key={index} className="emoji-container">
              <div
                key={index}
                className="emoji"
                style={{ backgroundImage: `url(${require(`./assets/${emoji}.png`)})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
});
