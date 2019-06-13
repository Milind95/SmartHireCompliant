import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatSlideToggleModule, MatRadioModule, MatTabsModule, MatCardModule } from '@angular/material';
import {MatBadgeModule} from '@angular/material/badge';
import {TooltipModule} from 'primeng/tooltip'; 
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MatMenuModule } from '@angular/material/menu';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SidebarModule } from 'primeng/sidebar';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './components/table/table.component';
import { SelectComponent } from './components/select/select.component';
import { PopoverComponent } from './components/popover/popover.component';


@NgModule({
  declarations: [
    BookingDialogComponent,
    ConfirmationComponent,
    HeaderComponent,
    TableComponent,
    SelectComponent,
    PopoverComponent],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatExpansionModule,TooltipModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatNativeDateModule, MatMomentDateModule,
    FormsModule, ReactiveFormsModule, MatAutocompleteModule, MultiSelectModule,
    DropdownModule, CardModule, TieredMenuModule, MatMenuModule, MatDialogModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, NgxSpinnerModule, MatSlideToggleModule, MatRadioModule, MatTabsModule, NgbModule, NgxPaginationModule, SelectDropDownModule, SidebarModule, IonicModule, MatCardModule, NgxDatatableModule, IonicSelectableModule
  ],
  exports: [MatButtonModule,MatBadgeModule, MatCheckboxModule, MatFormFieldModule,
   MatSelectModule, MatIconModule, MatInputModule, 
   NgxMaterialTimepickerModule, MatExpansionModule, MatDatepickerModule,
    MatNativeDateModule, MatMomentDateModule, FormsModule, ReactiveFormsModule,
     MatAutocompleteModule, MultiSelectModule, DropdownModule, CardModule,
      TieredMenuModule, MatMenuModule, MatDialogModule, OwlDateTimeModule,
       OwlNativeDateTimeModule, MatTabsModule, MatRadioModule, NgxSpinnerModule, 
       MatSlideToggleModule, NgbModule, NgxPaginationModule, SelectDropDownModule,
        SidebarModule, HeaderComponent, IonicModule, MatCardModule, NgxDatatableModule, 
	IonicSelectableModule, TableComponent, SelectComponent],
  entryComponents: [
    BookingDialogComponent,
    ConfirmationComponent,
    PopoverComponent
  ]
})
export class SharedModule { }
