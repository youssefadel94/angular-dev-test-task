import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'bp-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: ['./line-chart.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
	@Input()
	data!: Observable<any>;
	subscription!: Subscription;
	chartData: {
		left: number;
		bottom: number;
		hypotenuse: number;
		angle: number;
		value: any;
	}[]=[];
	originalData: any;


	ngOnInit(): void {
		console.log("");
		this.subscription = this.data.subscribe(v => {
			// console.log(23,v);
			if (v.length > 2) {
				this.chartData = v;
				this.originalData = v; 
				// this.render(
				this.chartData=this.formatLineChartData(this.chartData, 400)
				// , document.getElementById('line-chart'))
				console.log(28, this.chartData);
			}
			else {
				// console.log(v);
        
				this.originalData.push(...v);
				console.log(this.originalData);
        
				this.originalData.shift();
				this.originalData.shift();

				this.chartData = this.originalData;
				// this.render(
				this.chartData=this.formatLineChartData(this.chartData, 400)
				// , document.getElementById('line-chart'))
				console.log(37, this.chartData);
			}


		});

	}
	// chartValues = [{ price: 25 }, { price: 60 }, { price: 45 }, { price: 50 }, { price: 40 }]

	formatLineChartData(values: string | any[], chartHeight: any) {

		//divide chart size by total number of points to get length of triangle base. That becomes the left offset for each new point
		//subtract previous point height from new point height to get the rise of the triangle. That becomes the bottom offset for the new point.
		//use base squared + rise squared to find the length of the hypotenuse. That becomes the width of the line to draw.
		//use Math.asin(base / hypotenuse) [then convert the radians to degrees] to find the degree angle to rotate the line to.
		//Multiply the rotation angle by -1 if it needs to rise to meet the next point.

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


	render(data: any[], container: HTMLElement | null) {
		console.log(data, container)
		container ? container.innerHTML = "": null;
		data.forEach((item) => {
			const markup = this.createListItem(item);
			const listItem = document.createElement("li");
			listItem.style.cssText = `--x: ${item.left}px; --y: ${item.bottom}px`;
			listItem.innerHTML = markup;
			container ? container.appendChild(listItem) : null;
		});
	}

	createListItem(item: { value: any; hypotenuse: any; angle: any; }) {
		return `
  <div class="data-point" data-value="${item.value}"></div>
  <div class="line-segment" style="--hypotenuse: ${item.hypotenuse}; --angle:${item.angle};"></div>
  `;
	}


}
