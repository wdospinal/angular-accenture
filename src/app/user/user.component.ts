import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = { companyName: '', companyTime: '', salary: '0', dni: '' };
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  userForm: FormGroup;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'companyName': new FormControl(this.user.companyName, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'companyTime': new FormControl(this.user.companyTime, [
        Validators.required,
      ]),
      'salary': new FormControl(this.user.salary, [
        Validators.required,
        Validators.min(0),
        Validators.max(100000000),
        Validators.pattern("^[0-9]*$"),
      ]),
    });
  }

  moreOfOneYear(date): boolean {
    let actualDate: Date = new Date();
    let timeDiff = Math.abs(actualDate.getTime() - date.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 365;
  }

  loan(): void {
    let loan: number;
    if (this.moreOfOneYear(this.companyTime.value) || this.salary.value >= 800000) {
      if (this.salary.value <= 1000000) {
        loan = 5000000;
      } else if (this.salary.value <= 4000000) {
        loan = 20000000;
      } else if (this.salary.value > 4000000) {
        loan = 50000000;
      }
    } else {
      loan = 0;
    }
    let dialogRef = this.dialog.open(DialogLoan, {
      width: '250px',
      height: '250px',
      data: { companyName: this.companyName.value, loan }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get companyName() { return this.userForm.get('companyName'); }
  get companyTime() { return this.userForm.get('companyTime'); }
  get salary() { return this.userForm.get('salary'); }

}

@Component({
  selector: 'loan-dialog',
  templateUrl: 'loan-dialog.html',
})
export class DialogLoan {

  constructor(
    public dialogRef: MatDialogRef<DialogLoan>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}