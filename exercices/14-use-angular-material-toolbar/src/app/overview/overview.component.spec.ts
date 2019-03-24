import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OverviewComponent } from './overview.component';
import { ContactService } from 'shared/contact.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['getContactList']);
  const getContactListSpy = mockContactService.getContactList.and.returnValue( of([]) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule
      ],
      declarations: [ OverviewComponent ],
      providers:    [
        { provide: ContactService, useValue: mockContactService }
      ]
    })
    .compileComponents();
  }));

  afterEach(() => {
    getContactListSpy.calls.reset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getContactList of ContactService on init', () => {
    expect(getContactListSpy).toHaveBeenCalledTimes(1);
  });
});
