// MovieCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from '../MovieCard';

// Mock the useNavigation hook
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('MovieCard', () => {
  const movie = {
    id: 118642,
    title: 'Mr. & Mrs. Smith',
    poster_path: '/kvJvGxsDLi3MmHzc9nregyJtOWY.jpg',
  };

  it('renders the movie title', () => {
    const { getByText } = render(<MovieCard movie={movie} isHome={true} />);
    expect(getByText('Mr. & Mrs. Smith')).toBeTruthy();
  });

  it('navigates to the Detail screen when pressed', () => {
    const { getByTestId } = render(<MovieCard movie={movie} isHome={true} />);
    const touchableOpacity = getByTestId('118642');
    fireEvent.press(touchableOpacity);
    expect(mockNavigate).toHaveBeenCalledWith('Detail', { item: movie });
  });
});
