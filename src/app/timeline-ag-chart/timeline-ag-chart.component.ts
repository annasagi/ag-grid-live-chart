import { Component, OnInit, ViewChild } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgCartesianChartOptions, time } from 'ag-charts-community';

@Component({
	selector: 'timeline-ag-chart-component',
	templateUrl: './timeline-ag-chart.component.html',
	styleUrls: ['./timeline-ag-chart.component.scss']
})
export class TimeLineAgChartComponent implements OnInit {
	public options: AgCartesianChartOptions;

	@ViewChild(AgChartsAngular)
	public agChart!: AgChartsAngular;

	private systemLoad = 0;
	private userLoad = 0;
	private data: any[] = [];
	private refreshRateInMilliseconds = 50;
	private millisecondsOfData = 30 * 1000;
	private now = Date.now();

	constructor() {
		this.options = {
			autoSize: true,
			data: this.getData(),
			theme: {
				palette: {
					fills: ['#ec4d3d', '#4facf2'],
					strokes: ['#ec4d3d', '#4facf2']
				},
				overrides: { area: { series: { fillOpacity: 0.5 } } }
			},
			title: {
				text: 'Simulated CPU Usage',
				fontSize: 18
			},
			series: [
				{
					type: 'area',
					xKey: 'time',
					yKey: 'system',
					stacked: true,
					yName: 'System'
				}
				// {
				// 	type: 'area',
				// 	xKey: 'time',
				// 	yKey: 'user',
				// 	stacked: true,
				// 	yName: 'User'
				// }
			],
			axes: [
				{
					type: 'time',
					position: 'bottom',
					nice: false,
					tick: {
						interval: time.second.every(5, { snapTo: this.now })
					}
				},
				{
					type: 'number',
					position: 'left',
					title: {
						text: 'Load (%)'
					},
					min: 0,
					max: 100
				}
			]
		};
	}

	ngOnInit() {
		setInterval(this.updateData, this.refreshRateInMilliseconds);
	}

	private updateData = () => {
		const options = { ...this.options };

		var now = Date.now();
		options.data = this.getData();

		this.options = options;
	};

	private calculateRandomDelta(maxChange: number) {
		return maxChange / 2 - Math.floor(Math.random() * Math.floor(maxChange + 1));
	}
	private ensureBounds(load: number, max: number) {
		if (load > max) {
			return max;
		} else if (load < 0) {
			return 0;
		}
		return load;
	}
	private calculateCpuUsage() {
		this.systemLoad = this.ensureBounds(this.systemLoad + this.calculateRandomDelta(2), 30);
		this.userLoad = this.ensureBounds(this.userLoad + this.calculateRandomDelta(4), 70);
	}
	private getData() {
		var dataCount = this.millisecondsOfData / this.refreshRateInMilliseconds;
		this.data.shift();
		var timeDelta = (dataCount - this.data.length - 1) * this.refreshRateInMilliseconds;
		var now = Date.now();
		while (this.data.length < dataCount) {
			this.calculateCpuUsage();
			this.data.push({ time: now - timeDelta, system: this.systemLoad, user: this.userLoad });
			timeDelta -= this.refreshRateInMilliseconds;
		}
		return this.data;
	}
}
