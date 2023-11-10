import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeLineChartCanvasComponent } from './timeline-chart-canvas.component';

describe('TimeLineChartCanvasComponent', () => {
	let component: TimeLineChartCanvasComponent;
	let fixture: ComponentFixture<TimeLineChartCanvasComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TimeLineChartCanvasComponent]
		});
		fixture = TestBed.createComponent(TimeLineChartCanvasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
