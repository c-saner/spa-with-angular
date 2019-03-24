import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ContactService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getContactList with URL http://localhost:3000/contacts', () => {
    service.getContactList().subscribe(
      contactList => expect(contactList.length).toBe(0)
    );

    const req = httpTestingController.expectOne('http://localhost:3000/contacts');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call saveContact with URL http://localhost:3000/contacts', () => {
    service.saveContact(null).subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/contacts');
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });
});
