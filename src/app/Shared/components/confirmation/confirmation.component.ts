import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private dataService: DataService
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirm() {
    console.log(this.data);
    if (this.data.role === "Interviewer") {
      console.log('going back ....')
      this.dialogRef.close('Deleted');
      // this.recursive(this.data.idArray)
      this.data.idArray.forEach((id, index) => {
        this.dataService.deleteInterviewerSlot(id).subscribe(res => {
          console.log("delete res", res, index, this.data.idArray.length);
          if (res['response'][0] === true && (index === 0)) {
            this.dialogRef.close('Deleted');
          }
        });

      });
    } else {

      this.data.idArray.forEach((id, index) => {
        let obj = {
          recruiterCalendarId: id,
          emailId: this.data.email
        }
        this.dataService.deleteRecruiterslot(obj).subscribe(res => {
          console.log("delete res", res);
          if (res['response'][0] === true && (index === 0)) {
            this.dialogRef.close('Deleted');
          }
        })
      });
    }

  }

}
