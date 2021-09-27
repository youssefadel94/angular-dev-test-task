import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';

@NgModule({
	declarations: [ AppComponent, LineChartComponent, DropDownComponent, ChartViewComponent ],
	imports: [BrowserModule, FormsModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
