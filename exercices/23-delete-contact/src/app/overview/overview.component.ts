import { Component, OnInit } from '@angular/core';
import { ContactService } from 'shared/contact.service';
import { Contact } from 'shared/contact.type';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  contacts: Contact[];
  displayedColumns = ['firstName', 'lastName', 'phone', 'email', 'actions'];

  constructor(private readonly contactSerive: ContactService,
    private readonly router: Router,
    public readonly dialog: MatDialog) { }

  ngOnInit() {
    this.getContactList();
  }

  addContact(): void {
    this.router.navigate(['/add']);
  }

  delete(contactToDelete: Contact): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: contactToDelete
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getContactList();
      }
    });
  }

  private getContactList(): void {
    this.contactSerive.getContactList().subscribe(response => this.contacts = response);
  }
}
