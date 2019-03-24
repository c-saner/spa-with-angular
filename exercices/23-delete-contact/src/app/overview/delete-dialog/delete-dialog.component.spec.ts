import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ContactService } from 'shared/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  const mockContactService = jasmine.createSpyObj('ContactService', ['deleteContact']);
  const deleteContactSpy = mockContactService.deleteContact.and.returnValue(of([]));

  const mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const closeSpy = mockMatDialogRef.close.and.returnValue(true);

  const mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  const openSpy = mockMatSnackBar.open.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [DeleteDialogComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    deleteContactSpy.calls.reset();
    closeSpy.calls.reset();
    openSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel correctly', () => {
    component.cancel();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(deleteContactSpy).toHaveBeenCalledTimes(0);
    expect(openSpy).toHaveBeenCalledTimes(0);
  });

  it('should delete correctly', () => {
    component.delete();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(deleteContactSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledTimes(1);
  });
});
