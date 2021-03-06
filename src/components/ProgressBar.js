import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.initialTime
    };
  }

  componentDidMount() {
    if (this.props.startTimer) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.startTimer !== prevProps.startTimer) {
      if (this.props.startTimer) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    }
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      if (this.state.timer === 0) {
        this.resetTimer();
        this.props.handleTimerFinished();
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }
    }, 1000);
  }

  resetTimer = () => {
    clearInterval(this.timerId);
    this.setState(() => ({ timer: this.props.initialTime }));
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const percentageWidth = 100 - ((this.state.timer / this.props.initialTime) * 100);

    return (
      <div className="progress-bar">
        <span className="progress-bar__text">{`Reloading in ${this.state.timer}s`}</span>
        <div className="progress-bar__container">
          <div className="progress-bar__filler" style={{ width: `${percentageWidth}%`}}></div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  startTimer: PropTypes.bool.isRequired,
  initialTime: PropTypes.number.isRequired,
  handleTimerFinished: PropTypes.func.isRequired
}
