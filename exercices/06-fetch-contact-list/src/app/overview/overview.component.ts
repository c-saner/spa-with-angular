import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor(private readonly contactSerive: ContactService) { }

  ngOnInit() {
    this.contactSerive.getContactList().subscribe();
  }

}
