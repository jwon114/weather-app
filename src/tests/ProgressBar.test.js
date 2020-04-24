import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ProgressBar from '../components/ProgressBar';

jest.useFakeTimers();

test('should render ProgressBar correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<ProgressBar />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('sets ProgressBar timer state to 0 when timer finishes', () => {
  const renderer = TestRenderer.create(<ProgressBar 
    startTimer={true} 
    secondsCountdown={60}
    handleTiemrFinished={() => {}} />)

  const app = renderer.getInstance();
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  console.log(app.state);
});


