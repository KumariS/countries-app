import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import { store } from './store';

/**Set up React Router for navigating between the tabs and the country details page.**/
const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Countries</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/country/:countryId" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
