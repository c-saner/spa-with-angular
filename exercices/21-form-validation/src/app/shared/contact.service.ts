import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'shared/contact.type';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private readonly http: HttpClient) { }

  getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }

  saveContact(contact: Contact): Observable<any> {
    return this.http.post('http://localhost:3000/contacts', contact);
  }
}
