export type CountryData = {
  id: string;
  country: string;
  chartType: ChartType;
  chartColor: ChartColor;
  category: StatsCategory;
  xAxis: string;
  yAxis: string;
  description: string;
  data: CountryDataItem[];
};

export type ChartType = 'line' | 'area' | 'bar';
export type ChartColor = 'black' | 'blue' | 'red';

export interface CountryDataItem {
  Country: string;
  Category: StatsCategory;
  DateTime: string;
  Value: number;
  Frequency: string;
  HistoricalDataSymbol: string;
  LastUpdate?: string;
}

export type StatsCategory =
  | "health"
  | "markets"
  | "taxes"
  | "gdp"
  | "housing"
  | "trade"
  | "climate"
  | "labour"
  | "overview"
  | "prices"
  | "government"
  | "consumer"
  | "business"
  | "money"
  | "inflation"
  | "population";
