import React, { Component } from 'react';
import './Activity.css';

export default class Activity extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { activity, colors, happiness, productivity } = this.props;

    return (
      <div className="activity" style={{ backgroundColor: colors.body, border: `solid ${colors.border}` }}>
        <div className="content">
          {activity}
        </div>
      </div>
    );
  }
};
