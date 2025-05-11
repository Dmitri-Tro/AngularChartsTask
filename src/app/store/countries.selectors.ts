import {AppState} from "../app.config";
import {createSelector} from "@ngrx/store";

const selectCountriesState = (state: AppState) => state.countries;
export const selectAllData = (state: AppState) => state.countries.countriesData;
export const selectCountryData = createSelector(
  selectCountriesState,
  (state) => {
    const data = state.selectedCountryData;
    return data ? { ...data } : null;
  }
);