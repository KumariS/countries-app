import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

describe('App Component', () => {
  test('renders CountryList component on default route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    /**Default Route Test */
    expect(screen.getByText(/Country List/i)).toBeInTheDocument();
  });

  test('renders Dashboard component on /dashboard route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    /**Dashboard Route Test */
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test('renders CountryDetails component on /country/:countryId route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/country/USA']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    /**CountryDetails Route Test: */
    expect(screen.getByText(/Country Details/i)).toBeInTheDocument();
  });
});
