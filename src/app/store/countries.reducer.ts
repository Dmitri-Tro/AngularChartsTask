import {createReducer, on} from "@ngrx/store";
import {CountryData} from "../models/countryData.model";
import * as CountriesActions from './countries.actions';

export interface CountriesReducerState {
  countriesData: CountryData[];
  selectedCountryData: CountryData | null;
}

const initialState: CountriesReducerState = {
  countriesData: [],
  selectedCountryData: null,
};

export const countriesReducer = createReducer(initialState,
  on(CountriesActions.loadCountryDataSuccess, (state, action): CountriesReducerState => {
    return {
      ...state,
      countriesData: [...state.countriesData, action.data],
    }
  }),
  on(CountriesActions.loadCountryDataFailure, (state): CountriesReducerState => {
    return {
      ...state,
      countriesData: [],
    }
  }),
  on(CountriesActions.setCountryData, (state, action): CountriesReducerState => {
    const selectedData = state.countriesData.find(country => country.id === action.id)
    return {
      ...state,
      selectedCountryData: selectedData ? selectedData
        : state.countriesData[0] ? state.countriesData[0]
          : null,
    }
  }),
  on(CountriesActions.updateCountryData, (state, action): CountriesReducerState => {
    return {
      ...state,
      countriesData: state.countriesData.map(data => {
        const updatedData: CountryData = {
          ...data,
          chartType: action.chartType,
          chartColor: action.chartColor,
          xAxis: action.xAxis,
          yAxis: action.yAxis,
          description: action.description,
        }
        return data.id === action.id ? updatedData : data
      })
    }
  }),
  on(CountriesActions.deleteCountryData, (state, action): CountriesReducerState => {
    return {
      ...state,
      countriesData: state.countriesData.filter(data => data.id !== action.id),
    }
  }),
);