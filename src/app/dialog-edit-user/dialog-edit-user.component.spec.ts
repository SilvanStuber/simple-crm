import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditUserComponent,
        MatDialogModule,
        FirestoreModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
