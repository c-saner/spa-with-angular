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

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['saveContact']);
  const saveContactSpy = mockContactService.saveContact.and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [AddContactComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
