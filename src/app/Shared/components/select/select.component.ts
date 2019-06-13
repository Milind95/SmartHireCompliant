import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

class Select {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() items: Select[];
  @Input() selectedItem: Select[];
  @Input() isMultiple: boolean;
  @Input() searchFilter:boolean;
  @Input() icon: string;

  @Output() output = new EventEmitter<Select[]>();

  constructor() {

  }

  ngOnInit() {
    console.log("Label : ", this.label);
    console.log("Items : ", this.items);
    console.log("selectedItem : ", this.selectedItem);
  }

  change(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.output.emit(this.selectedItem)

  }
}
