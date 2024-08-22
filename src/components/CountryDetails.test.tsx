import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CountryDetails from './CountryDetails';
import { RootState } from '../store';

const mockStore = configureStore<RootState>();

describe('CountryDetails Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countries: [
          {
            cca3: 'USA',
            name: { common: 'United States' },
            flags: { png: 'https://restcountries.com/v3.1/all.png',svg: 'https://restcountries.com/v3.1/all.svg' },
            capital: ['Washington, D.C.'],
            population: 331000000,
            region: 'Americas',
            subregion: 'Northern America',
            area: 9833520,
          },
          {
            cca3: 'CAN',
            name: { common: 'Canada' },
            flags: { png: 'https://restcountries.com/v3.1/all.png', svg: 'https://restcountries.com/v3.1/all.svg' },
            capital: ['Ottawa'],
            population: 37742154,
            region: 'Americas',
            subregion: 'Northern America',
            area: 9984670,
          },
        ],
        status: 'succeeded',
        error: null,
        page: 1,
        perPage: 10,
        totalCountries: 2,
      },
    });
  });

  test('renders country details when a valid countryId is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/country/USA']}>
          <Routes>
            <Route path="/country/:countryId" element={<CountryDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/United States/i)).toBeInTheDocument();
    expect(screen.getByText(/Capital: Washington, D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 331000000/i)).toBeInTheDocument();
    expect(screen.getByText(/Region: Americas/i)).toBeInTheDocument();
    expect(screen.getByText(/Subregion: Northern America/i)).toBeInTheDocument();
    expect(screen.getByText(/Area: 9833520 km²/i)).toBeInTheDocument();
  });

  test('renders "Country not found." when an invalid countryId is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/country/XYZ']}>
          <Routes>
            <Route path="/country/:countryId" element={<CountryDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Country not found./i)).toBeInTheDocument();
  });
});
