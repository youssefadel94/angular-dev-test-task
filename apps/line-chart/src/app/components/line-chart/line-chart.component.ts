import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

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
	chartData: {
		left: number;
		bottom: number;
		hypotenuse: number;
		angle: number;
		value: any;
	}[] = [];
	originalData: any;
	gotOriginal = false;
	constructor(private cdr: ChangeDetectorRef,) { }
	ngOnInit(): void {
		// console.log("");
		// // TODO create a new read dynamic flag
		this.subscription = this.data.subscribe(v => {
			if (!v) this.gotOriginal = false;
			// console.log(23,v);
			if (!this.gotOriginal) {
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

				v.forEach(() => { this.originalData.shift()});

				this.chartData = this.originalData;

				// this.render(
				this.chartData = this.formatLineChartData(this.chartData, 400)
				// , document.getElementById('line-chart'))
				// console.log(37, this.chartData);
				this.cdr.detectChanges();
			}


		});

	}
	// chartValues = [{ price: 25 }, { price: 60 }, { price: 45 }, { price: 50 }, { price: 40 }]

	formatLineChartData(values: string | any[], chartHeight: any) {


		const widgetSize = chartHeight;
		const pointSize = 2;

		const base = (widgetSize - pointSize / 2) / values.length;

		const sortedValues = this.sortValues([...values]);

		const topMostPoint = sortedValues[0].price;
		let leftOffset = pointSize; //padding for left axis labels
		let nextPoint = 0;
		let rise = 0;
		const cssValues = [];

		for (let i = 0, len = values.length - 1; i < len; i++) {

			const currentValue = {
				left: 0,
				bottom: 0,
				hypotenuse: 0,
				angle: 0,
				value: 0
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
			value: values[values.length - 1].price
		};

		cssValues.push(lastPoint);

		return cssValues;
	}

	sortValues = (values: any[]) => values.sort((a, b) => b.price - a.price)

	radiansToDegrees = (rads: number) => rads * (180 / Math.PI)

	sum = (total: any, value: { value: any; }) => total + value.value





}
