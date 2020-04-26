import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import ProgressBar from '../components/ProgressBar';

test('should render ProgressBar correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<ProgressBar />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should display 60 second countdown text', () => {
  const { getByText } = render(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={() => {}} />);

  expect(getByText(/reloading in 60s/i)).toBeInTheDocument();
});

test('sets ProgressBar timer state to initial time when mounted', () => {
  const renderer = TestRenderer.create(<ProgressBar 
    startTimer={false} 
    initialTime={60}
    handleTimerFinished={() => {}} />);

  const app = renderer.getInstance();
  
  expect(app.state.timer).toEqual(60);
});

test('sets ProgressBar timer state to 0 when timer finishes and calls handleTimerFinished function', () => {
  jest.useFakeTimers();
  let renderer = TestRenderer.create(<ProgressBar 
    startTimer={true} 
    initialTime={60}
    handleTimerFinished={() => {}} />);

  const app = renderer.getInstance();
  expect(app.state.timer).toEqual(60);
  expect(setInterval).toHaveBeenCalled();
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);  
  jest.advanceTimersByTime(60000);
  expect(app.state.timer).toEqual(0);
  expect(app.props.handleTimerFinished).toHaveBeenCalled();
});

// test('starts ProgressBar timer when startTimer prop changes', () => {
//   jest.useFakeTimers();
//   let renderer = TestRenderer.create(<ProgressBar 
//     startTimer={false} 
//     initialTime={60}
//     handleTimerFinished={() => {}} />);

//   const app = renderer.getInstance();
//   expect(app.state.timer).toEqual(60);
//   app.update();
//   expect(setInterval).toHaveBeenCalled();
//   expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);  
//   jest.advanceTimersByTime(60000);
//   expect(app.state.timer).toEqual(0);
//   expect(app.props.handleTimerFinished).toHaveBeenCalled();
// });

