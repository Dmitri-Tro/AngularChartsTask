import {createAction, props} from "@ngrx/store";
import {CountryData} from "../models/countryData.model";

export const loadCountryData = createAction(
  '[Countries] Load Data',
  props<Omit<CountryData, 'data' | 'id'>>(),
);

export const loadCountryDataSuccess = createAction(
  '[Countries] Load Data Success',
  props<{ data: CountryData }>(),
);

export const loadCountryDataFailure = createAction(
  '[Countries] Load Data Failure',
  props<{ error: string }>(),
);

export const setCountryData = createAction(
  '[Countries] Set Country Data',
  props<{ id: string }>(),
);

export const updateCountryData = createAction(
  '[Countries] Update Data',
  props<Omit<CountryData, 'data'>>(),
);

export const deleteCountryData = createAction(
  '[Countries] Delete Data',
  props<{ id: string }>(),
)