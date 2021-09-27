import { CurrencyService } from '../../../services/currency.service';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'bp-chart-view',
	templateUrl: './chart-view.component.html',
	styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
	currenciesNames: Array<{ key: string, name: string }> = [];
	constructor(private currencies: CurrencyService) {
		const c = this.currencies.getCurrenciesNames();
		Object.keys(c).forEach(key => this.currenciesNames.push({ key, name: c[key]}));
	}

	ngOnInit(): void {
		console.log("");
    
	}

}
