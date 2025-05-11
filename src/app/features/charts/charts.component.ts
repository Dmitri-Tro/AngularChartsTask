import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {NoChartComponent} from "./no-chart/no-chart.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.config";
import {selectAllData} from "../../store/countries.selectors";
import {ChartPageComponent} from "./chart-page/chart-page.component";
import {Router} from "@angular/router";
import {setCountryData} from "../../store/countries.actions";

@Component({
  selector: 'app-charts',
  imports: [
    NoChartComponent,
    ChartPageComponent
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  chartsData = this.store.selectSignal(selectAllData);

  navigationEffect = effect(() => {
    const charts = this.chartsData();
    if (charts.length > 0 && this.router.url === '/charts') {
      this.store.dispatch(setCountryData({id: charts[0].id}));
      this.router.navigate(['/charts', charts[0].id]);
    } else if (charts.length === 0 && this.router.url !== '/charts') {
      this.router.navigate(['/charts']);
    }
  });

}
