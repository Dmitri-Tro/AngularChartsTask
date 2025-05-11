import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import * as uuid from 'uuid';
import {CountriesApiService} from "../services/api/countriesApi.service";
import * as CountriesActions from './countries.actions';
import {CountryData} from "../models/countryData.model";

@Injectable()
export class CountriesEffects {
  actions = inject(Actions);
  apiService = inject(CountriesApiService);

  loadCountryData$ = createEffect(() => this.actions.pipe(
      ofType(CountriesActions.loadCountryData),
      mergeMap((payload: Omit<CountryData, 'data' | 'id'>) =>
        this.apiService.getCountryData(payload.country, payload.category)
          .pipe(
            map(response => {
              if (response.body) {
                const countryData: CountryData = {
                  id: uuid.v4(),
                  country: response.body[0].Country,
                  category: response.body[0].Category,
                  chartType: payload.chartType,
                  chartColor: payload.chartColor,
                  xAxis: payload.xAxis,
                  yAxis: payload.yAxis,
                  description: payload.description,
                  data: response.body,
                }
                return CountriesActions.loadCountryDataSuccess({data: countryData})
              } else {
                return CountriesActions.loadCountryDataFailure({error: 'Something went wrong on server side. Please try again later.'})
              }


            }),
            catchError(error => of(CountriesActions.loadCountryDataFailure({error: error.message}))),
          )
      )
    )
  );
}
