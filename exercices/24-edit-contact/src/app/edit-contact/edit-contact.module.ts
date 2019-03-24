import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditContactComponent } from './edit-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [EditContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class EditContactModule { }
