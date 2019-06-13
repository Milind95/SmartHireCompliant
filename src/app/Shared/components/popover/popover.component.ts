import { PopoverController, NavParams, Events } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  allColumns = [];
  columnData = [];
  selectAll: boolean = true;
  selectLabel: string = "Un Check All";
  searchText: string;

  constructor(private popoverController: PopoverController,
    private navParams: NavParams,
    private events: Events) { }

  ngOnInit() {
    this.allColumns = this.navParams.get('allColumns').map(allCol => {
      return {
        ...allCol,
        isShow: true
      }
    });
    this.columnData = this.navParams.get('columnData');
  }

  toggle(col) {
    const isChecked = this.isChecked(col);
    if (isChecked) {
      this.columnData = this.columnData.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columnData = [...this.columnData, col];
    }

    this.events.publish('fromPopoverEvent', this.columnData, this.allColumns);
  }

  closePopover() {
    this.popoverController.dismiss();
  }


  isChecked(col) {
    return this.columnData.find(c => {
      return c.name === col.name;
    });
  }

  toogleSelectAll() {
    if (this.selectAll) {
      this.allColumns.forEach(col => {
        col.isChecked = false;
      });
      this.columnData = [];
      this.selectLabel = "Check All";

      this.events.publish('fromPopoverEvent', [], this.allColumns);
    } else {
      this.columnData = this.allColumns;
      this.allColumns.forEach(col => {
        col.isChecked = true;
      });
      this.columnData.forEach(col => {
        col.isChecked = true;
      });
      this.selectLabel = "Un Check All";
      this.events.publish('fromPopoverEvent', this.columnData, this.allColumns);
    }
  }


  searchValues(event) {
    let valueToMatch = this.searchText.toLowerCase();
    let allFilteredColumns = this.allColumns.filter(col => {
      return col.prop.toLowerCase().includes(valueToMatch)
    });
    this.allColumns.forEach(allCol => {
      let isAvailable = allFilteredColumns.find(filter => {
        return filter.prop === allCol.prop
      });
      if (isAvailable) {
        allFilteredColumns.forEach(allFilteredCol => {
          if (allCol.prop === allFilteredCol.prop) {
            allCol.isShow = true;
          }
        });
      } else {
        allCol.isShow = false;
      }

    });
  }

}
