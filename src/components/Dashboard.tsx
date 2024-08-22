/**Show summary information like the total number of countries, regions, and other relevant statistics.**/
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { countries } = useSelector((state: RootState) => state.countries);

  const totalCountries = countries.length;
  const regions = Array.from(new Set(countries.map((country) => country.region))).length;
  const subRegions = Array.from(new Set(countries.map((country) => country.subregion))).length;


  return (
    <div className="country-dashboard">
      <h1>Dashboard</h1>
      <p>Total Countries: {totalCountries}</p>
      <p>Total Regions: {regions}</p>
      <p>Total SubRegions: {subRegions}</p>
    </div>
  );
};

export default Dashboard;
