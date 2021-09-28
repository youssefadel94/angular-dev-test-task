import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyNames } from '../../interfaces/types';

@Component({
	selector: 'bp-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent  {
	@Input()
	options!: Array<CurrencyNames>;
	@Output() selectChange = new EventEmitter();
	selected = "";
	constructor() {
		// console.log("");
		this.selected = 'BTC'
	}

	// ngOnInit(): void {
	//   // console.log("");

	// }
	onSelect() {
		this.selectChange.emit(this.selected);
	}
}
