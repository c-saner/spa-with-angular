import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';

@NgModule({
  declarations: [PhoneFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [
    PhoneFormatPipe
  ]
})
export class SharedModule { }
