import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {MenuComponent} from "../../../../shared/menu/menu.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.config";
import * as CountriesActions from "../../../../store/countries.actions";
import {deleteCountryData} from "../../../../store/countries.actions";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-list-item',
  imports: [
    MenuComponent,
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  appService = inject(AppService);
  private store = inject(Store<AppState>);
  onChartClick = output<string>();
  item = input.required<{ name: string, id: string }>();

  onChartClickHandler() {
    this.store.dispatch(CountriesActions.setCountryData({id: this.item().id}));
    this.appService.closeMobileChartsMenu();
  };

  onDelete() {
    this.store.dispatch(deleteCountryData({id: this.item().id}))
  };
}
