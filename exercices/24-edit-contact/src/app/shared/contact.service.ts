import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'shared/contact.type';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private readonly http: HttpClient) { }

  getContact(contactId: string): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${contactId}`);
  }

  getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }

  saveContact(contact: Contact): Observable<any> {
    return this.http.post('http://localhost:3000/contacts', contact);
  }

  deleteContact(contactId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/contacts/${contactId}`);
  }

  editContact(contactId: string, contact: Contact): Observable<any> {
    return this.http.put(`http://localhost:3000/contacts/${contactId}`, contact);
  }
}
