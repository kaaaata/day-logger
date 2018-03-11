import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import _ from 'lodash';
import './Box.css';

const mapStateToProps = (state) => ({ activeActivity: state.default.activeActivity, days: state.default.days });
const mapDispatchToProps = (dispatch) => ({ updateActivity: (activity) => dispatch(actions.updateActivity(activity)) });

export default connect(mapStateToProps, mapDispatchToProps)(class Box extends Component {
  onBoxClick(e) {
    const x = e.nativeEvent.offsetX - 8;
    const y = e.nativeEvent.offsetY - 8;

    // the box is 158px by 158px, the extra 8px is to align the happiness/productivity dart with the cursor pointer tip.
    // it is > 0 instead of >= 0 to avoid some weird glitch with double clicking the dart causing x=0, y=0
    if (x > 0 && y > 0 && x <= 150 && y <= 150) {
      console.log(x, y);
      this.props.updateActivity({ happiness: x, productivity: y });
    }
  }

  render() {
    const { updateActivity } = this.props;
    const { id, date, colors, activity, happiness, productivity } = _.flatten(this.props.days.map(day => day.activities))
      .filter(activity => activity.id === this.props.activeActivity.id)[0];

    return (
      <div
        className="box"
        onClick={(e) => this.onBoxClick(e)}
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <div
          className="dart"
          style={{ left: happiness, top: productivity, backgroundColor: 'black' }}
        />
        {[
          { name: 'smiling', top: '-5px', left: '55px' },
          { name: 'sunglasses', top: '-5px', left: '105px' },
          { name: 'crying', top: '-10px', left: '55px' },
          { name: 'zany', top: '-105px', left: '5px' },
        ].map((emoji, index) => (
          <div
            key={index}
            className="emoji"
            style={{ 
              backgroundImage: `url(${require(`./assets/${emoji.name}.png`)})`,
              top: emoji.top,
              left: emoji.left
            }}
          ></div>
        ))}
      </div>
    );
  }
});
