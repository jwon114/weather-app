import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import ProgressBar from '../components/ProgressBar';

test('should render ProgressBar correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<ProgressBar 
    startTimer={false}
    initialTime={60}
    handleTimerFinished={jest.fn()} />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should display 60 second countdown text', () => {
  const { getByText } = render(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);

  expect(getByText(/reloading in 60s/i)).toBeInTheDocument();
});

test('sets ProgressBar timer state to initial time when mounted', () => {
  const renderer = TestRenderer.create(<ProgressBar 
    startTimer={false} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);

  const app = renderer.getInstance();
  
  expect(app.state.timer).toEqual(60);
});

test('sets ProgressBar timer state to 0 when timer finishes', () => {
  jest.useFakeTimers();
  const renderer = TestRenderer.create(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);

  const app = renderer.getInstance();
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);  
  jest.advanceTimersByTime(60000);
  expect(app.state.timer).toEqual(0);
});

test('calls handleTimerFinished function and resets timer to initialTime when timer finishes', () => {
  jest.useFakeTimers();
  const renderer = TestRenderer.create(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);

  const app = renderer.getInstance();
  expect(app.state.timer).toEqual(60);
  jest.runAllTimers();
  expect(app.state.timer).toEqual(60);
  expect(app.props.handleTimerFinished).toHaveBeenCalledTimes(1);
});

test('starts ProgressBar timer when startTimer prop changes', () => {
  jest.useFakeTimers();
  let renderer = TestRenderer.create(<ProgressBar 
    startTimer={false} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);

  const app = renderer.getInstance();
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(0);

  renderer.update(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={jest.fn()} />);
  
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

