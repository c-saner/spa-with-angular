import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'shared/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'shared/contact.type';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html'
})
export class EditContactComponent implements OnInit {

  editContactForm: FormGroup;

  private contactToUpdate: Contact;

  constructor(private route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly contactSerive: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getContactToEdit();
  }

  cancel(): void {
    this.router.navigate(['/overview']);
  }

  onSubmit() {
    this.contactSerive.editContact(this.contactToUpdate.id, this.createContactFromForm()).subscribe(response => {
      this.router.navigate(['/overview']);
      this.snackBar.open(
        `Contact ${this.contactToUpdate.firstName} ${this.contactToUpdate.lastName} successfully edited`,
        '',
        { duration: 5000 }
      );
    });
  }

  public hasFieldRequiredError(fieldName: string): boolean {
    return this.editContactForm.get(fieldName).hasError('required');
  }

  private createForm(): void {
    this.editContactForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  private fillForm(): void {
    this.editContactForm.get('firstName').setValue(this.contactToUpdate.firstName);
    this.editContactForm.get('lastName').setValue(this.contactToUpdate.lastName);
    this.editContactForm.get('phone').setValue(this.contactToUpdate.phone);
    this.editContactForm.get('email').setValue(this.contactToUpdate.email);
  }

  private createContactFromForm(): Contact {
    return {
      firstName: this.editContactForm.get('firstName').value,
      lastName: this.editContactForm.get('lastName').value,
      phone: this.editContactForm.get('phone').value,
      email: this.editContactForm.get('email').value,
    };
  }

  private getContactToEdit(): void {
    const contactToUpdateId: string = this.route.snapshot.paramMap.get('contactId');
    this.contactSerive.getContact(contactToUpdateId).subscribe(response => {
      this.contactToUpdate = response;
      this.fillForm();
    });
  }

}
