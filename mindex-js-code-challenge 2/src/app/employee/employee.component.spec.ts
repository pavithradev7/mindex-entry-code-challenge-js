import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({selector: 'mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const matDialogSpy = jasmine.createSpyObj('matDialogSpy', ['open']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      providers: [
        {provide: MatDialog, useValue: matDialogSpy}
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));
});
