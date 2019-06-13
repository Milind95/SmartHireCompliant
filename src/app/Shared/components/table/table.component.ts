import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PopoverController, Events } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() loadingIndicator: boolean = false;
  @Input() rowData: any;
  @Input() columnData: any;
  @Input() limit: number;


  @ViewChild(DatatableComponent) table: DatatableComponent;
  reorderable: boolean = true;
  swapColumns: boolean = false;

  temp = [];
  tempFilter = [];

  allColumns = [];
  selected = [];
  constructor(public popoverController: PopoverController,
    private events: Events) {

  }

  ngOnInit() {
    this.columnData = this.columnData.map(col => {
      return {
        ...col,
        filter: "",
        isChecked: true,
        isShow: true
      }
    })

    console.log(this.columnData);

    this.allColumns = [...this.columnData];

    this.temp = [...this.rowData];
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }


  updateFilter() {
    this.tempFilter = JSON.parse(JSON.stringify(this.temp));
    // filter our data
    this.columnData.forEach(col => {
      console.log("col", col);

      this.tempFilter = this.tempFilter.filter(function (d) {
        console.log("d[col.prop]", d, d[col.prop]);
        return d[col.prop].toString().toLowerCase().indexOf(col.filter.toString().toLowerCase()) !== -1 || col.filter === "";
      });
    });

    // update the rows
    this.rowData = this.tempFilter;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  resetFilters() {
    this.columnData.forEach(col => {
      col.filter = ""
    });
    this.updateFilter();
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        allColumns: this.allColumns,
        columnData: this.columnData
      },
      translucent: false,
    });

    this.events.subscribe('fromPopoverEvent', (columnData, allColumnData) => {
      this.columnData = columnData;
      this.allColumns = allColumnData;
    });

    return await popover.present();
  }
}
