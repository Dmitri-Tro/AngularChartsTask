import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ChartFormComponent} from "../../features/charts/chart-form/chart-form.component";
import {MatDialog} from "@angular/material/dialog";
import {ChartFormDialogData} from "../../features/charts/chart-form/chart-form.model";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MenuComponent {
  private dialog = inject(MatDialog);
  onDelete = output();

  onEditClick() {
    this.dialog.open(ChartFormComponent, {
      data: {title: 'Edit Chart', action: 'edit'} as ChartFormDialogData,
    });
  };

  onDeleteClick() {
    this.onDelete.emit();
  }
}