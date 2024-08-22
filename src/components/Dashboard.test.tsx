import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from './Dashboard';
import { RootState } from '../store';

const mockStore = configureStore<RootState>();

describe('Dashboard Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countries: [
          {
            cca3: 'USA',
            name: { common: 'United States' },
            region: 'Americas',
            subregion: 'Northern America',
            flags: { png: 'https://restcountries.com/v3.1/all.png',svg: 'https://restcountries.com/v3.1/all.svg' },
            capital: ['Washington, D.C.'],
            population: 331000000,
            area: 9833520,
          },
          {
            cca3: 'CAN',
            name: { common: 'Canada' },
            region: 'Americas',
            subregion: 'Northern America',
            flags: { png: 'https://restcountries.com/v3.1/all.png',svg: 'https://restcountries.com/v3.1/all.svg' },
            capital: ['Washington, D.C.'],
            population: 331000000,
            area: 9833520,
          },
          {
            cca3: 'DEU',
            name: { common: 'Germany' },
            region: 'Europe',
            subregion: 'Western Europe',
            flags: { png: 'https://restcountries.com/v3.1/all.png',svg: 'https://restcountries.com/v3.1/all.svg' },
            capital: ['Washington, D.C.'],
            population: 331000000,
            area: 9833520,
          },
        ],
        status: 'succeeded',
        error: null,
        page: 1,
        perPage: 10,
        totalCountries: 3,
      },
    });
  });

  test('renders total number of countries', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Total Countries: 3/i)).toBeInTheDocument();
  });

  test('renders total number of regions', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Total Regions: 2/i)).toBeInTheDocument(); // Americas, Europe
  });

  test('renders total number of subregions', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Total SubRegions: 2/i)).toBeInTheDocument(); // Northern America, Western Europe
  });
});
