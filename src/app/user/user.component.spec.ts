import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore, FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const activatedRouteMock = {
  paramMap: of(new Map([['id', '123']])),
};

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
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

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
