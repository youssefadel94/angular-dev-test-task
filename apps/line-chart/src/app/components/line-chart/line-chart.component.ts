import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartPoint } from '../../interfaces/types';

@Component({
	selector: 'bp-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

	@Input()
	data!: Observable<any>;
	@Input()
	selector!: string;
	subscription!: Subscription;
	chartData: ChartPoint[] = [];
	originalData: ChartPoint[] = [];
	gotOriginal = false;

	//canvas implement
	@ViewChild('myCanvas') myCanvas!: ElementRef;
	context!: CanvasRenderingContext2D;
	readToDraw = false;

	constructor(private cdr: ChangeDetectorRef,) {

	}
	ngAfterViewInit(): void {
		const context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');

		if (context) {
			this.context = context;
			this.readToDraw = true;
		}

	}
	ngOnInit(): void {
		// console.log("");
		// // TODO create a new read dynamic flag
		this.subscription = this.data.subscribe(v => {
			if (!v.length) this.gotOriginal = false;
			// console.log(23,v);
			if (!this.gotOriginal && v.length) {
				this.chartData = v;
				this.originalData = v;
				// this.render(
				this.chartData = this.formatLineChartData(this.chartData, 400)
				// , document.getElementById('line-chart'))
				this.cdr.detectChanges();


				this.gotOriginal = true;
			}
			else {
				// console.log(v);

				this.originalData.push(...v);
				// console.log(this.originalData);

				v.forEach(() => { this.originalData.shift() });

				this.chartData = this.originalData;

				// this.render(
				this.chartData = this.formatLineChartData(this.chartData, 400)
				// , document.getElementById('line-chart'))
				// console.log(37, this.chartData);
				this.cdr.detectChanges();


			}
			// console.log(this.readToDraw);

			if (this.readToDraw) this.drawCanvas();

		});


	}
	drawCanvas() {
		// console.log("drawing canvas");
    
		//clear canvas
		this.context.clearRect(0, 0, 400, 400);

		this.context.beginPath();
		// Draw Y-Axis
		this.context.moveTo(0, 0);
		this.context.lineTo(0, 400);
		// Draw X-Axis
		this.context.moveTo(0, 400);
		this.context.lineTo(400, 400);
    
		this.context.moveTo(this.chartData[0].left, this.chartData[0].bottom);

		//draw line chart
		for (const point of this.chartData) {
			const x = point.left;
			const y = point.bottom;
			this.context.lineTo(x, y);
		}


		this.context.stroke();
	}
	// chartValues = [{ price: 25 }, { price: 60 }, { price: 45 }, { price: 50 }, { price: 40 }]

	formatLineChartData(values: ChartPoint[], chartHeight: number) {


		const widgetSize = chartHeight;
		const pointSize = 2;

		const base = (widgetSize - pointSize / 2) / values.length;

		const sortedValues = this.sortValues([...values]);

		const topMostPoint = sortedValues[0].price;
		let leftOffset = pointSize; //padding for left axis labels
		let nextPoint = 0;
		let rise = 0;
		const cssValues: ChartPoint[] = [];

		for (let i = 0, len = values.length - 1; i < len; i++) {

			const currentValue: ChartPoint = {
				left: 0,
				bottom: 0,
				hypotenuse: 0,
				angle: 0,
				value: 0,
				price: 0,
			};

			currentValue.value = values[i].price;
			currentValue.left = leftOffset;
			leftOffset += base;

			currentValue.bottom = (widgetSize - pointSize) * (currentValue.value / topMostPoint);
			nextPoint = (widgetSize - pointSize) * (values[i + 1].price / topMostPoint);

			rise = currentValue.bottom - nextPoint;
			currentValue.hypotenuse = Math.sqrt((base * base) + (rise * rise));
			currentValue.angle = this.radiansToDegrees(Math.asin(rise / currentValue.hypotenuse));

			cssValues.push(currentValue);
		}

		const lastPoint = {
			left: leftOffset,
			bottom: (widgetSize - pointSize) * (values[values.length - 1].price / topMostPoint),
			hypotenuse: 0,
			angle: 0,
			value: values[values.length - 1].price,
			price: 0
		};

		cssValues.push(lastPoint);

		return cssValues;
	}

	sortValues = (values: any[]) => values.sort((a, b) => b.price - a.price)

	radiansToDegrees = (rads: number) => rads * (180 / Math.PI)

	sum = (total: any, value: { value: any; }) => total + value.value





}
