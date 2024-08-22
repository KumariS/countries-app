/**Display a paginated list of countries retrieved from the API.**/
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCountries, setPage } from '../features/countriesSlice';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import '../styles.css'; // Import the CSS file

const CountryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countries, status, page, perPage, totalCountries } = useSelector((state: RootState) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const startIndex = (page - 1) * perPage;
  const paginatedCountries = countries.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(totalCountries / perPage);

  return (
    <div>
      <h1>Country List</h1>
      {status === 'loading' && <p className="country-list">Loading...</p>}
      {status === 'failed' && <p>Error loading countries.</p>}
      {status === 'succeeded' && (
        <>
          <div className="country-list">
            {paginatedCountries.map((country) => (
              <div key={country.cca3} className="country-card">
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <h2><Link to={`/country/${country.cca3}`}>{country.name.common}</Link></h2>
              </div>
            ))}
          </div>
          <div className="pagination-buttons">
            <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
              Previous
            </button>
            <span className="page-indicator">{page} / {totalPages}</span>
            <button
              disabled={page === Math.ceil(totalCountries / perPage)}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryList;
