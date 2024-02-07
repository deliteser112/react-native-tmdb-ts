import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { AppProvider } from '../../context/AppContext';

const mockContext = {
  trendingTVShows: [
    {
      id: 1,
      name: 'Breaking Bad',
      poster_path: '/path-to-image',
      overview: 'Description',
    },
    {
      id: 2,
      name: 'Game of Thrones',
      poster_path: '/path-to-image',
      overview: 'Description',
    },
  ],
  loading: false,
  error: null,
  fetchTrendingTVShows: jest.fn(),
};

jest.mock('../../context/AppContext', () => ({
  AppContext: {
    Consumer: (props: any) => props.children(mockContext),
    Provider: ({ children }: any) => children,
  },
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <AppProvider>
        <HomeScreen />
      </AppProvider>,
    );

    expect(getByText('Trending TV Shows')).toBeTruthy();
  });

  it('contains a search input that can be typed into', () => {
    const { getByPlaceholderText } = render(
      <AppProvider>
        <HomeScreen />
      </AppProvider>,
    );

    const searchInput = getByPlaceholderText('Search TV Shows');
    fireEvent.changeText(searchInput, 'Breaking Bad');

    expect(searchInput.props.value).toEqual('Breaking Bad');
  });

  it('filters the list based on the search input', () => {
    const { getByPlaceholderText, getAllByText, queryByText } = render(
      <AppProvider>
        <HomeScreen />
      </AppProvider>,
    );

    const searchInput = getByPlaceholderText('Search TV Shows');
    fireEvent.changeText(searchInput, 'Breaking Bad');

    expect(getAllByText('Breaking Bad').length).toBeGreaterThan(0);
    expect(queryByText('Game of Thrones')).toBeNull();
  });
});
