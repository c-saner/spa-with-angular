import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    SharedModule
  ]
})
export class OverviewModule { }
