/**Clicking on a country redirects to a detailed page for that country.**/
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../styles.css'; // Import the CSS file

const CountryDetails: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const country = useSelector((state: RootState) =>
    state.countries.countries.find((c) => c.cca3 === countryId)
  );

  if (!country) {
    return <p>Country not found.</p>;
  }

  return (
    <>
    <h1>Country Details</h1>
    <div className="country-details">
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area} km²</p>
    </div>
    </>
  );
};

export default CountryDetails;
