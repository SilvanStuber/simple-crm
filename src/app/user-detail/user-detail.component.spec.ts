import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  FirestoreModule,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const activatedRouteMock = {
  paramMap: of(new Map([['id', '123']])),
};

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserDetailComponent,
        MatDialogModule,
        FirestoreModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
