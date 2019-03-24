import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'shared/contact.service';
import { Contact } from 'shared/contact.type';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly contactSerive: ContactService) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.contactSerive.saveContact(this.createContactFromForm()).subscribe();
  }

  public hasFieldRequiredError(fieldName: string): boolean {
    return this.addContactForm.get(fieldName).hasError('required');
  }

  private createForm(): void {
    this.addContactForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  private createContactFromForm(): Contact {
    return {
      firstName: this.addContactForm.get('firstName').value,
      lastName: this.addContactForm.get('lastName').value,
      phone: this.addContactForm.get('phone').value,
      email: this.addContactForm.get('email').value,
    };
  }
}
