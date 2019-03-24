import { Component, OnInit } from '@angular/core';
import { ContactService } from 'shared/contact.service';
import { Contact } from 'shared/contact.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  contacts: Contact[];
  displayedColumns = ['firstName', 'lastName', 'phone', 'email'];

  constructor(private readonly contactSerive: ContactService,
    private readonly router: Router) { }

  ngOnInit() {
    this.contactSerive.getContactList().subscribe(response => this.contacts = response);
  }

  addContact(): void {
    this.router.navigate(['/add']);
  }
}
