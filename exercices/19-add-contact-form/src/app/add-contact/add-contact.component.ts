import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    console.log(this.addContactForm.value);
  }

  private createForm(): void {
    this.addContactForm = this.formBuilder.group({
      'firstName' : [''],
      'lastName' : [''],
      'phone' : [''],
      'email' : ['']
    });
  }
}
