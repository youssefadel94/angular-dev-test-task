import { CurrencyService } from '../../../services/currency.service';
import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
@Component({
	selector: 'bp-chart-view',
	templateUrl: './chart-view.component.html',
	styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
	// subscription: Subscription;

	currenciesNames: Array<{ key: string, name: string }> = [];
	selected = 'BTC'; N = 10; realTime = true;
	data=[];
	cur: any;
	constructor(private currencies: CurrencyService) {
		const c = this.currencies.getCurrenciesNames();
		// this.subscription = this.currencies.listen().subscribe(v => {
		//   console.log(v);
		//   this.data = v;
		// });
		this.cur = this.currencies.listen();
		Object.keys(c).forEach(key => this.currenciesNames.push({ key, name: c[key]}));
	}

	ngOnInit(): void {
		this.currencies.getCurrency(this.selected, this.N, this.realTime);
    
    
	}
	selectChangeHandler(selected: string) {
		this.selected = selected;
		this.currencies.getCurrency(this.selected, this.N, this.realTime);

	}

}
