import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import {MatInput} from "@angular/material/input";
import {AppState} from "../../../app.config";
import * as CountriesActions from "../../../store/countries.actions";
import {isAllowedCountry} from "./chart-form.validators";
import {ChartForm, ChartFormDialogData} from "./chart-form.model";
import {selectCountryData} from "../../../store/countries.selectors";
import {ChartColor, ChartType, StatsCategory} from "../../../models/countryData.model";

@Component({
  selector: 'app-add-chart',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatSelectModule,
    MatDialogTitle,
    FormsModule,
    MatInput,
  ],
  templateUrl: './chart-form.component.html',
  styleUrl: './chart-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChartFormComponent {
  private store = inject(Store<AppState>);
  private dialogRef = inject(MatDialogRef<ChartFormComponent>);
  private selectedCountryData = this.store.selectSignal(selectCountryData);
  readonly data = inject<ChartFormDialogData>(MAT_DIALOG_DATA);
  readonly title = this.data.title;
  readonly actionButtonText = this.data.action === 'edit' ? 'SAVE CHANGES' : 'ADD CHART';

  chartTypes: ChartType[] = ['line', 'bar', 'area'];
  chartColors: ChartColor[] = ['black', 'blue', 'red'];
  chartDataseries: StatsCategory[] = ['gdp', 'population'];

  chartForm = new FormGroup<ChartForm>({
    name: new FormControl(
      {
        value: this.data.action === 'edit' ? this.selectedCountryData()!.country : '',
        disabled: this.data.action === 'edit',
      },
      {
        nonNullable: true,
        validators: [Validators.required, isAllowedCountry],
      }
    ),
    type: new FormControl(this.data.action === 'edit' ? this.selectedCountryData()!.chartType : 'line', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    color: new FormControl(this.data.action === 'edit' ? this.selectedCountryData()!.chartColor : 'black', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dataseries: new FormControl(
      {
        value: this.data.action === 'edit' ? this.selectedCountryData()!.category : 'gdp',
        disabled: this.data.action === 'edit',
      }, {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    xAxis: new FormControl(this.data.action === 'edit' ? this.selectedCountryData()!.xAxis : '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    yAxis: new FormControl(this.data.action === 'edit' ? this.selectedCountryData()!.yAxis : '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(this.data.action === 'edit' ? this.selectedCountryData()!.description : '', {
      nonNullable: true,
      validators: [],
    }),
  });

  private formStatus = toSignal(this.chartForm.statusChanges);
  private formValues = toSignal(this.chartForm.valueChanges);

  private formEffect = effect(() => {
    if (this.formStatus() !== undefined || this.formValues() !== undefined) {
      this.updateErrorMessage();
    }
  });

  nameErrorMessage = signal('');
  typeErrorMessage = signal('');
  colorErrorMessage = signal('');
  dataseriesErrorMessage = signal('');
  xAxisErrorMessage = signal('');
  yAxisErrorMessage = signal('');
  descriptionErrorMessage = signal('');

  updateErrorMessage() {
    if (this.chartForm.get('name')?.hasError('required')) {
      this.nameErrorMessage.set('Field "Country Name" is required');
    } else if (this.chartForm.get('name')?.hasError('notAllowedCountry')) {
      this.nameErrorMessage.set('Free accounts have access to the following countries: Mexico, New Zealand, Sweden, Thailand.');
    } else {
      this.nameErrorMessage.set('');
    }
    const errorSetters = {
      'type': this.typeErrorMessage,
      'color': this.colorErrorMessage,
      'dataseries': this.dataseriesErrorMessage,
      'xAxis': this.xAxisErrorMessage,
      'yAxis': this.yAxisErrorMessage,
      'description': this.descriptionErrorMessage
    };

    Object.entries(errorSetters).forEach(([key, setter]) => {
      if (this.chartForm.get(key)?.invalid) {
        setter.set('Set correct value');
      } else {
        setter.set('');
      }
    });
  };

  onChartFormSubmit() {
    if (this.chartForm.valid) {
      const chartData = {
        country: this.chartForm.value.name!,
        chartType: this.chartForm.value.type!,
        chartColor: this.chartForm.value.color!,
        category: this.chartForm.value.dataseries!,
        xAxis: this.chartForm.value.xAxis!,
        yAxis: this.chartForm.value.yAxis!,
        description: this.chartForm.value.description!,
      }
      if (this.data.action === 'edit') {
        this.store.dispatch(CountriesActions.updateCountryData({...chartData, id: this.selectedCountryData()!.id}));
        this.store.dispatch(CountriesActions.setCountryData({id: this.selectedCountryData()!.id}));
      } else if (this.data.action === 'create') {
        this.store.dispatch(CountriesActions.loadCountryData(chartData));
      }
      this.dialogRef.close();
    }
  };

  onCancelClick(): void {
    this.dialogRef.close();
  };
}
