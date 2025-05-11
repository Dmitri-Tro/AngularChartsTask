import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CountryDataItem} from "../../models/countryData.model";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  private readonly baseUrl = environment.BASE_URL;
  private readonly apiKey = environment.API_KEY;
  private httpClient = inject(HttpClient);

  getCountryData(country: string, indicator: string) {
    return this.httpClient.get<CountryDataItem[]>(
      `${this.baseUrl}/historical/country/${country}/indicator/${indicator}?c=${this.apiKey}`,
      {observe: 'response'}
    );
  };
}

