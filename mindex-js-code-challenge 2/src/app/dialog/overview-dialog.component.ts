import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  templateUrl: './overview-dialog.component.html',
  styleUrls: ['./overview-dialog.component.css'],
})
export class OverviewDialogComponent implements OnInit {
  employee: Employee;
  constructor(
    public dialogRef: MatDialogRef<OverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  ngOnInit(): void {
    this.employee = { ...this.data };
  }

  onNoClick(): void {
    this.dialogRef.close(this.employee);
  }
}
