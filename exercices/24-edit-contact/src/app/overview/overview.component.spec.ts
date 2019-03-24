import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OverviewComponent } from './overview.component';
import { ContactService } from 'shared/contact.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['getContactList']);
  const getContactListSpy = mockContactService.getContactList.and.returnValue( of([]) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        SharedModule,
        RouterTestingModule
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
