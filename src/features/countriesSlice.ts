/**Use Redux Toolkit to create slices for managing countries and dashboard data.**/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Country {
  cca3: string;
  name: { common: string };
  population: number;
  region: string;
  subregion?: string;
  area: number;
  capital?: string[];
  flags: { png: string; svg: string };
}

interface CountriesState {
  countries: Country[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  perPage: number;
  totalCountries: number;
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
  error: null,
  page: 1,
  perPage: 10,
  totalCountries: 0,
};
//First, create the thunk
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
  return response.data;
});

//Then, handle actions in reducers
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
        state.totalCountries = action.payload.length;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch countries';
      });
  },
});

export const { setPage, setPerPage } = countriesSlice.actions;

export default countriesSlice.reducer;
