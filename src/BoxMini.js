import React, { Component } from 'react';
import './styles/BoxMini.css';

export default class BoxMini extends Component {
  render() {
    const { colors, happiness, productivity } = this.props;

    return (
      <div
        className="box-mini"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        <div
          className="dart"
          style={{ left: ~~(productivity / 4), top: ~~(happiness / 4), backgroundColor: 'black' }}
        />
        <div
          className="emoji"
          style={{
            backgroundImage: `url(${require(`./assets/${
              happiness < 75
                ? (productivity < 75 ? 'smiling' : 'sunglasses')
                : (productivity < 75 ? 'zany' : 'crying')
            }.png`)})`,
          }}
        ></div>
      </div>
    );
  }
};
