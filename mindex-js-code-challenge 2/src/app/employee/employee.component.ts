import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Employee } from '../employee';
import { OverviewDialogComponent } from '../dialog/overview-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  @Input()
  employee: Employee;

  @Input()
  employees: Employee[];

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  getReportingEmployees(): number {
    if (!this.employee.directReports) return 0;
    return this.employee.directReports.reduce((count, empId) => {
      var currentEmployee = this.employees.find(emp => emp.id === empId);
      if (!currentEmployee || !currentEmployee.directReports) return count;
      return count + currentEmployee.directReports.length;
    }, this.employee.directReports.length);
  }

  getDirectReports(): Employee[] {
    if (!this.employee.directReports) return [];
    return this.employees.filter(emp =>
      this.employee.directReports.includes(emp.id)
    );
  }

  onEdit(directEmp: Employee): void {
    const dialogRef = this.dialog.open(OverviewDialogComponent, {
      width: '350px',
      data: directEmp,
    });

    dialogRef.afterClosed().subscribe(result => {
      directEmp.firstName = result.firstName;
      directEmp.lastName = result.lastName;
      directEmp.position = result.position;
      directEmp.compensation = result.compensation;
      this.edit.emit(result);
    });
  }

  onDelete(directEmp: Employee): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: directEmp,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result && !!result.id) {
        this.delete.emit(result);
      }
    });
  }
}
