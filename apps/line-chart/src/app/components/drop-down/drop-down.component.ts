import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'bp-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
	@Input()
	options!: Array<{ key:string, name:string }>;
	@Output() selectChange = new EventEmitter();
	selected = "";
	constructor() {
		console.log("");

	}

	ngOnInit(): void {
		console.log("");

	}
	onSelect() {
		this.selectChange.emit(this.selected);
	}
}
