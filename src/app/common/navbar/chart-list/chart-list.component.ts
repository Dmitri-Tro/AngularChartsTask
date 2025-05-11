import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ListItemComponent} from "./list-item/list-item.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatDialog} from "@angular/material/dialog";
import {ChartFormComponent} from "../../../features/charts/chart-form/chart-form.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.config";
import {selectAllData} from "../../../store/countries.selectors";
import {ChartFormDialogData} from "../../../features/charts/chart-form/chart-form.model";
import {SearchService} from "../../../shared/search/search.service";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-chart-list',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    ListItemComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './chart-list.component.html',
  styleUrl: './chart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartListComponent {
  appService = inject(AppService);
  private store = inject(Store<AppState>);
  private searchService = inject(SearchService);
  private dialog = inject(MatDialog);
  private countriesData = this.store.selectSignal(selectAllData);

  filteredCountriesData = computed(() => {
    const searchValue = this.searchService.debouncedSearch().toLowerCase().trim();
    return this.countriesData().filter(countryData => {
      return countryData.country.toLowerCase().includes(searchValue)
    })
  })

  onAddChartClick() {
    this.appService.closeMobileChartsMenu();
    this.dialog.open(ChartFormComponent, {
      data: {title: 'Add Chart', action: "create"} as ChartFormDialogData,
    });
  };
}
