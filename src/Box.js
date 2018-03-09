import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import './Box.css';

const mapStateToProps = (state) => ({ letters: state.letters });
const mapDispatchToProps = (dispatch) => ({ addLetter: (letter) => dispatch(actions.addLetter(letter)) });

export default connect(mapStateToProps, mapDispatchToProps)(class Box extends Component {
  onClick(e) {
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }
  render() {
    return (
      <div className="box" onClick={(e) => this.onClick(e)} />
    );
  }
});


