import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public charts = 10;
	chartsArray = Array(this.charts)
		.fill(0)
		.map((x, i) => i);
}
