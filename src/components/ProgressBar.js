import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTime: props.initialTime,
      timer: props.initialTime
    };
  }

  componentDidMount() {
    if (this.props.startTimer) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // refactor or fix?
    if (this.props.startTimer !== prevProps.startTimer) {
      if (this.props.startTimer) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    }
  }

  startTimer = () => {
    this.timerId = setInterval(this.calculateTimeLeft, 1000);
  }

  resetTimer = () => {
    clearInterval(this.timerId);
    this.setState(() => ({ timer: this.state.initialTime }));
  }

  calculateTimeLeft = () => {
    if (this.state.timer === 0) {
      this.resetTimer();
      console.log('handleTimerFinished')
      this.props.handleTimerFinished();
    } else {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
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
  startTimer: PropTypes.bool,
  initialTime: PropTypes.number,
  handleTimerFinished: PropTypes.func
}
