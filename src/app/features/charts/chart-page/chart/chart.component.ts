import {ChangeDetectionStrategy, Component, computed, inject, input,} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.config';
import {HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import {selectCountryData} from '../../../../store/countries.selectors';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  protected readonly Highcharts = Highcharts;
  private store = inject(Store<AppState>);
  start = input.required<Date>();
  end = input.required<Date>();
  chartData = this.store.selectSignal(selectCountryData);

  filteredData = computed(() => {
    const chart = this.chartData();
    if (!chart) return [];

    const startYear = this.start()?.getFullYear() ?? 0;
    const endYear = this.end()?.getFullYear() ?? 9999;

    return chart.data
      .filter(item => {
        const year = new Date(item.DateTime).getFullYear();
        return year >= startYear && year <= endYear;
      })
      .map(item => [new Date(item.DateTime).getTime(), item.Value]);
  });

  chartOptions = computed((): Highcharts.Options => {
    const chart = this.chartData();
    if (!chart) return {};

    const chartName = chart.category + ' of ' + chart.country;

    return {
      title: {text: ''},
      accessibility: {enabled: false},
      xAxis: {
        type: 'datetime',
        title: {text: chart.xAxis},
      },
      yAxis: {
        title: {text: chart.yAxis},
      },
      series: [
        {
          name: chartName,
          type: chart.chartType,
          color: chart.chartColor,
          data: this.filteredData(),
        },
      ],
    };
  });

  runOutsideAngular = true;
}
