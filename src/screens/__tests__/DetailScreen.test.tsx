// DetailScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetailScreen from '../DetailScreen';

describe('MovieDetailScreen', () => {
  const route = {
    params: {
      item: {
        title: 'Test Movie',
        name: 'Test Movie Name', // This will be ignored because title is provided
        poster_path: '/testpath.jpg',
        overview: 'This is a test movie overview.',
      },
    },
  };

  it('displays the movie title and overview', () => {
    const { getByText } = render(<MovieDetailScreen route={route} />);
    expect(getByText('Test Movie')).toBeTruthy(); // Check if the movie title is rendered
    expect(getByText('This is a test movie overview.')).toBeTruthy(); // Check if the movie overview is rendered
  });
});
