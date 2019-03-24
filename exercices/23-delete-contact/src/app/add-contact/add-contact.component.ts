import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'shared/contact.service';
import { Contact } from 'shared/contact.type';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly contactSerive: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  cancel(): void {
    this.router.navigate(['/overview']);
  }

  onSubmit() {
    this.contactSerive.saveContact(this.createContactFromForm()).subscribe(response => {
      this.router.navigate(['/overview']);
      this.snackBar.open('Contact successfully added', '', {duration: 5000});
    });
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
