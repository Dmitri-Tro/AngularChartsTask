import {FormControl} from "@angular/forms";
import {ChartColor, ChartType, StatsCategory} from "../../../models/countryData.model";

export interface ChartFormDialogData {
  title: string;
  action: 'create' | 'edit';
}

export interface ChartForm {
  name: FormControl<string>;
  type: FormControl<ChartType>;
  color: FormControl<ChartColor>;
  dataseries: FormControl<StatsCategory>;
  xAxis: FormControl<string>;
  yAxis: FormControl<string>;
  description: FormControl<string>;
}