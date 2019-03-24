import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactComponent } from './add-contact.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ContactService } from 'shared/contact.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OverviewComponent } from '../overview/overview.component';
import { OverviewModule } from '../overview/overview.module';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['saveContact']);
  const saveContactSpy = mockContactService.saveContact.and.returnValue(of([]));

  const mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  const openSpy = mockMatSnackBar.open.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OverviewModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule.withRoutes(
          [{ path: 'overview', component: OverviewComponent }]
        )
      ],
      declarations: [AddContactComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockMatSnackBar.open.calls.reset();
    mockContactService.saveContact.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    expect(component.addContactForm.get('firstName').value).toBe('');
    expect(component.addContactForm.get('lastName').value).toBe('');
    expect(component.addContactForm.get('phone').value).toBe('');
    expect(component.addContactForm.get('email').value).toBe('');
  });

  it('should send the form values correctly', () => {
    component.addContactForm.get('firstName').setValue('John');
    component.addContactForm.get('lastName').setValue('Doe');
    component.addContactForm.get('phone').setValue('000 000 00 00');
    component.addContactForm.get('email').setValue('john@doe.doe');

    component.onSubmit();

    expect(saveContactSpy).toHaveBeenCalledTimes(1);
    expect(saveContactSpy).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      phone: '000 000 00 00',
      email: 'john@doe.doe'
    });
  });

  it('should show the Snackbar message correctly', () => {
    component.onSubmit();
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith('Contact successfully added', '', { duration: 5000 });
  });

  it('should cancel correctly', () => {
    component.cancel();

    expect(openSpy).toHaveBeenCalledTimes(0);
    expect(saveContactSpy).toHaveBeenCalledTimes(0);
  });
});
