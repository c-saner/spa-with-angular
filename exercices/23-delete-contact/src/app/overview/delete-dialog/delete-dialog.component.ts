import { Component, OnInit, Inject } from '@angular/core';
import { Contact } from 'shared/contact.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'shared/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {

  constructor(private readonly dialogRef: MatDialogRef<DeleteDialogComponent>,
    private readonly contactSerive: ContactService,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public contact: Contact) { }

  cancel(): void {
    this.dialogRef.close(false);
  }

  delete(): void {
    this.contactSerive.deleteContact(this.contact.id).subscribe(response => {
      this.dialogRef.close(true);
      this.snackBar.open(`Contact ${this.contact.firstName} ${this.contact.lastName} successfully deleted`, '', { duration: 5000 });
    });
  }
}
