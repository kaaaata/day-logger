import React, { Component } from 'react';
import './styles/BoxMini.css';

export default class BoxMini extends Component {
  render() {
    const { colors, happiness, productivity } = this.props;

    return (
      <section
        className="box-mini"
        style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}
      >
        {/* <article
          className="dart"
          style={{ left: ~~(productivity / 4), top: ~~(happiness / 4), backgroundColor: 'black' }}
        /> */}
        <article
          className="emoji"
          style={{
            backgroundImage: `url(${require(`./assets/${
              happiness <= 75 // '<=' instead of '<' for optimism - defaults to 'smiling'
                ? (productivity <= 75 ? 'smiling' : 'dizzy')
                : (productivity <= 75 ? 'zany' : 'crying')
            }.png`)})`,
          }}
        />
      </section>
    );
  }
};
