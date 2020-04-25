import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.initialCountdown
    };
  }

  componentDidMount() {
    if (this.props.startTimer) {
      this.timerId = setInterval(this.calculateTimeLeft, 1000);
    }
  }

  calculateTimeLeft = () => {
    if (this.state.timer === 0) {
      clearInterval(this.timerId);
      this.props.handleTimerFinished();
    } else {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const percentageWidth = 100 - ((this.state.timer / this.props.initialCountdown) * 100);

    return (
      <div className="progress-bar">
        <div className="progress-bar__text">{`Reloading in ${this.state.timer}s`}</div>
        <div className="progress-bar__container">
          <div className="progress-bar__filler" style={{ width: `${percentageWidth}%`}}></div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  startTimer: PropTypes.bool,
  initialCountdown: PropTypes.number,
  handleTimerFinished: PropTypes.func
}
