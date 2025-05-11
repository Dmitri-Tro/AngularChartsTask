import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {provideHttpClient} from "@angular/common/http";
import {countriesReducer, CountriesReducerState} from "./store/countries.reducer";
import {CountryData} from "./models/countryData.model";
import {CountriesEffects} from "./store/countries.effects";

export interface AppState {
  countries: CountriesReducerState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
    ),
    provideHttpClient(),
    provideStore({
      countries: countriesReducer,
    }),
    provideEffects([
      CountriesEffects
    ]),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
        density: -1,
      },
    },
  ],
};
