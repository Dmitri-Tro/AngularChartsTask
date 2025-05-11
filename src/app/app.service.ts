import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})

export class AppService {
  isMobileChartsMenuOpen = signal(false);

  toggleMobileChartsMenu() {
    this.isMobileChartsMenuOpen.update(value => !value);
  };

  closeMobileChartsMenu() {
    this.isMobileChartsMenuOpen.set(false);
  };
}