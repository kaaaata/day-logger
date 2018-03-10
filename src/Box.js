import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './Box.css';

const mapStateToProps = (state) => ({ newActivity: state.default.newActivity });
const mapDispatchToProps = (dispatch) => ({
  updateNewActivity: (updates) => dispatch(actions.updateNewActivity(updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class Box extends Component {
  onClick(e) {
    const x = e.nativeEvent.offsetX - 8;
    const y = e.nativeEvent.offsetY - 8;

    // the box is 158px by 158px, the extra 8px is to align the happiness/productivity dart with the cursor pointer tip.
    // it is > 0 instead of >= 0 to avoid some weird glitch with double clicking the dart causing x=0, y=0
    if (x > 0 && y > 0 && x <= 150 && y <= 150) {
      console.log(x, y);
      this.props.updateNewActivity({ happiness: x, productivity: y });
    }
  }

  render() {
    const { colors, happiness, productivity } = this.props.newActivity;

    return (
      <div
        className="box"
        onClick={(e) => this.onClick(e)}
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <div
          className="dart"
          style={{ left: happiness, top: productivity, backgroundColor: 'black' }}
        />
        {['']}
      </div>
    );
  }
});
