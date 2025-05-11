import {Routes} from '@angular/router';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {ChartsComponent} from "./features/charts/charts.component";

export const routes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        redirectTo: 'charts',
        pathMatch: 'full',
      },
      {
        path: 'charts',
        component: ChartsComponent,
        children: [
          {
            path: ':id',
            component: ChartsComponent,
          }
        ]
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found',
      }
    ]
  },
];
