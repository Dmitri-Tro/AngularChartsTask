import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SearchComponent} from "../../../shared/search/search.component";
import {ChartListComponent} from "../chart-list/chart-list.component";

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    SearchComponent,
    ChartListComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
}
