import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  private createForm(): void {
    this.addContactForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'phone': [''],
      'email': ['']
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
