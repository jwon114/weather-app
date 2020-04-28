import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

test('should render ProgressBar correctly', () => {
  const root = create(<ProgressBar 
                        startTimer={false}
                        initialTime={60}
                        handleTimerFinished={jest.fn()} />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('should display 60 second countdown text', () => {
  const { getByText } = render(<ProgressBar 
                                startTimer={true} 
                                initialTime={60}
                                handleTimerFinished={jest.fn()} />);

  expect(getByText(/reloading in 60s/i)).toBeInTheDocument();
});

test('sets ProgressBar timer state to initial time when mounted', () => {
  const root = create(<ProgressBar 
                        startTimer={false} 
                        initialTime={60}
                        handleTimerFinished={jest.fn()} />);

  const app = root.getInstance();
  
  expect(app.state.timer).toEqual(60);
});

test('sets ProgressBar timer state to 0 when timer finishes', () => {
  jest.useFakeTimers();
  const root = create(<ProgressBar 
                        startTimer={true} 
                        initialTime={60}
                        handleTimerFinished={jest.fn()} />);
  
  const app = root.getInstance();

  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);  
  
  jest.advanceTimersByTime(60000);
  expect(app.state.timer).toEqual(0);
});

test('calls handleTimerFinished function and resets timer to initialTime when timer finishes', () => {
  jest.useFakeTimers();
  const root = create(<ProgressBar 
                        startTimer={true} 
                        initialTime={60}
                        handleTimerFinished={jest.fn()} />);

  const app = root.getInstance();
  
  expect(app.state.timer).toEqual(60);
  
  jest.runAllTimers();
  
  expect(app.state.timer).toEqual(60);
  expect(app.props.handleTimerFinished).toHaveBeenCalledTimes(1);
});

test('starts ProgressBar timer when startTimer prop changes', () => {
  jest.useFakeTimers();
  let root = create(<ProgressBar 
                      startTimer={false} 
                      initialTime={60}
                      handleTimerFinished={jest.fn()} />);

  const app = root.getInstance();
  
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(0);

  root.update(<ProgressBar 
                startTimer={true} 
                initialTime={60}
                handleTimerFinished={jest.fn()} />);
  
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

