import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import {
  FirestoreModule,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatDialogModule,
        FirestoreModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'simple-crm' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('simple-crm');
  });
});
