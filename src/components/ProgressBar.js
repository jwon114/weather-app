import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.secondsCountdown
    };
  }

  componentDidMount() {
    if (this.props.startTimer) {
      this.timerId = setInterval(() => this.setState((prevState) => ({
        timer: prevState.timer--
      })), 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer < 0) {
      clearInterval(this.timerId);
      this.setState(() => ({ timer: 0 }));
      this.props.handleTimerFinished();
    }
  }

  render() {
    const percentage = 100 - ((this.state.timer / this.props.secondsCountdown) * 100)

    return (
      <div className="progress-bar">
        <div className="progress-bar__text">{`Reloading in ${this.state.timer}s`}</div>
        <div className="progress-bar__container">
          <div className="progress-bar__filler" style={{ width: `${percentage}%`}}></div>
        </div>
      </div>
    );
  }
}