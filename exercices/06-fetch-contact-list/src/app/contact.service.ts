import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private readonly http: HttpClient) { }

  getContactList(): Observable<any> {
    return this.http.get('http://localhost:3000/contacts');
  }
}
