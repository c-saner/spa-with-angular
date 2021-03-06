import { Component, OnInit } from '@angular/core';
import { ContactService } from 'shared/contact.service';
import { Contact } from 'shared/contact.type';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  contacts: Contact[];

  constructor(private readonly contactSerive: ContactService) { }

  ngOnInit() {
    this.contactSerive.getContactList().subscribe(response => this.contacts = response);
  }

}
