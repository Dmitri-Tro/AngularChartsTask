import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './common/navbar/navbar.component';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ChartListComponent} from "./common/navbar/chart-list/chart-list.component";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatCard,
    MatCardContent,
    ChartListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    'role': 'main-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  appService = inject(AppService);
}
