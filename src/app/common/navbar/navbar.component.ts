import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";


@Component({
  selector: 'app-navbar',
  imports: [
    SidebarComponent,
    ToolbarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: {
    'role': 'navigation',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
}
