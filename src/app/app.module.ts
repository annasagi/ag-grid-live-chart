import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { TimeLineAgChartComponent } from './timeline-ag-chart/timeline-ag-chart.component';
@NgModule({
	declarations: [AppComponent, TimeLineAgChartComponent],
	imports: [BrowserModule, AgChartsAngularModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
