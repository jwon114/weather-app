import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 50,
      startTimer: false
    }
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar__filler" style={{ width: `${this.state.percentage}%`}}></div>
      </div>
    );
  }
}