import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContactList(): void {
    console.log('getContactList called');
  }
}
