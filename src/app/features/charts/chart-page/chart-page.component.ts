import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChartComponent} from "./chart/chart.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.config";
import {selectCountryData} from "../../../store/countries.selectors";
import {DatepickerComponent} from "../../../shared/datepicker/datepicker.component";

@Component({
  selector: 'app-chart-page',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    ChartComponent,
    DatepickerComponent,
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPageComponent {
  private store = inject(Store<AppState>);
  chartData = this.store.selectSignal(selectCountryData);
  chartName = computed(() => this.chartData()?.category + ' of ' + this.chartData()?.country);

  startYear = new Date(this.chartData()?.data[0].DateTime || 0);
  endYear = new Date();

  onDateRangeChange(range: { start: Date, end: Date }) {
    this.startYear = range.start;
    this.endYear = range.end;
  };
}
