import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartScreenComponent } from './start-screen.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StartScreenComponent,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
