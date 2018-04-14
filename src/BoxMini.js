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
        <article
          className="emoji"
          style={{
            backgroundImage: `url(${require(`./assets/${
              happiness >= 50 // '<=' instead of '<' for optimism - defaults to 'smiling'
                ? (productivity >= 50 ? 'smiling' : 'zany')
                : (productivity >= 50 ? 'dizzy' : 'crying')
            }.png`)})`,
          }}
        />
      </section>
    );
  }
};
