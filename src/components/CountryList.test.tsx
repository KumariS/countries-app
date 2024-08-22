import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CountryList from './CountryList';
import { RootState } from '../store';

jest.mock('../features/countriesSlice', () => ({
  fetchCountries: jest.fn(),
}));

const mockStore = configureStore<RootState>();

describe('CountryList Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countries: [],
        status: 'idle',
        error: null,
        page: 1,
        perPage: 10,
        totalCountries: 0,
      },
    });
  });

  test('renders loading state initially', () => {
    store = mockStore({
      countries: {
        countries: [],
        status: 'loading',
        error: null,
        page: 1,
        perPage: 10,
        totalCountries: 0,
      },
    });

    render(
      <Provider store={store}>
        <CountryList />
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders error state when fetching fails', () => {
    store = mockStore({
      countries: {
        countries: [],
        status: 'failed',
        error: '',
        page: 1,
        perPage: 10,
        totalCountries: 0,
      },
    });

    render(
      <Provider store={store}>
        <CountryList />
      </Provider>
    );

    expect(screen.getByText(/error loading countries/i)).toBeInTheDocument();
  });
});
