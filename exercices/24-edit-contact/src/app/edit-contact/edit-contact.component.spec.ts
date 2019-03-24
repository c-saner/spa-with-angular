import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactComponent } from './edit-contact.component';
import { OverviewModule } from '../overview/overview.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { OverviewComponent } from '../overview/overview.component';
import { of } from 'rxjs';
import { ContactService } from 'shared/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['getContact', 'editContact']);
  const editContactSpy = mockContactService.editContact.and.returnValue(of([]));
  const getContactSpy = mockContactService.getContact.and.returnValue(of({
    id: '42',
    firstName: 'Jeanne',
    lastName: 'Doe',
    phone: '111 111 11 11',
    email: 'jeanne@doe.doe'
  }));

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
      declarations: [EditContactComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    editContactSpy.calls.reset();
    openSpy.calls.reset();
    getContactSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    expect(component.editContactForm.get('firstName').value).toBe('Jeanne');
    expect(component.editContactForm.get('lastName').value).toBe('Doe');
    expect(component.editContactForm.get('phone').value).toBe('111 111 11 11');
    expect(component.editContactForm.get('email').value).toBe('jeanne@doe.doe');
  });

  it('should send the form values correctly', () => {
    component.editContactForm.get('firstName').setValue('John');
    component.editContactForm.get('lastName').setValue('Doe');
    component.editContactForm.get('phone').setValue('000 000 00 00');
    component.editContactForm.get('email').setValue('john@doe.doe');

    component.onSubmit();

    expect(editContactSpy).toHaveBeenCalledTimes(1);
    expect(editContactSpy).toHaveBeenCalledWith('42', {
      firstName: 'John',
      lastName: 'Doe',
      phone: '000 000 00 00',
      email: 'john@doe.doe'
    });
  });

  it('should show the Snackbar message correctly', () => {
    component.onSubmit();
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith('Contact Jeanne Doe successfully edited', '', { duration: 5000 });
  });

  it('should cancel correctly', () => {
    component.cancel();

    expect(openSpy).toHaveBeenCalledTimes(0);
    expect(editContactSpy).toHaveBeenCalledTimes(0);
  });
});
