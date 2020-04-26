import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.initialTime
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, 'prevProps')
    console.log(this.props.startTimer, 'this.props.startTimer')
    if (this.props.startTimer !== prevProps.startTimer) {
      console.log('in set interval')
      this.timerId = setInterval(this.calculateTimeLeft, 1000);
    }
  }

  calculateTimeLeft = () => {
    if (this.state.timer === 0) {
      clearInterval(this.timerId);
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
