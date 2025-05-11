import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ChartFormComponent} from "../chart-form/chart-form.component";
import {ChartFormDialogData} from "../chart-form/chart-form.model";

@Component({
  selector: 'app-no-chartPage',
  imports: [
    MatButton,
    MatIcon,
  ],
  templateUrl: './no-chart.component.html',
  styleUrl: './no-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoChartComponent {
  private dialog = inject(MatDialog);

  onAddChartClick(): void {
    this.dialog.open(ChartFormComponent, {
      data: {title: 'Add Chart', action: "create"} as ChartFormDialogData,
    });
  };
}
