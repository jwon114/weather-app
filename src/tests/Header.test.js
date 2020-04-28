import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import Header from '../components/Header';

test('should render Header correctly', () => {
  const root = create(<Header location={'london'} />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('renders location, time and temperature', () => {
  const { getByText } = render(<Header 
                                location={'london'} 
                                time={'10:24 GMT'}
                                temperature={24} />)
    
  expect(getByText(/london/i)).toBeInTheDocument();
  expect(getByText('10:24 GMT')).toBeInTheDocument();
  expect(getByText((content, node) => node.textContent === 24 + '°')).toBeInTheDocument();
});