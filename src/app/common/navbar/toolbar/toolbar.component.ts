import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SearchComponent} from "../../../shared/search/search.component";
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SearchComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  appService = inject(AppService);
  isSearchOpen = signal(false);

  toggleSearch(isOpen: boolean) {
    this.isSearchOpen.set(isOpen);
  };

  toggleMenu() {
    this.appService.toggleMobileChartsMenu();
  };
}
