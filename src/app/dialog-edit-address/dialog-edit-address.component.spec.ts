import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditAddressComponent,
        MatDialogModule,
        FirestoreModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
