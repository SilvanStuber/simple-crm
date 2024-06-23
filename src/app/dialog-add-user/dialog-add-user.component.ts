import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { User } from '../../../public/models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  user: User = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Saves the user to Firebase if a birth date is provided.
   * Converts the birth date to a timestamp and triggers the loading state.
   * Calls the method to add the user to Firebase and logs the current user.
   *
   * @async
   * @function saveUser
   * @returns {Promise<void>} A promise that resolves when the user is saved.
   */
  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      this.loading = true;
      this.cdr.detectChanges();
      await this.addNewUserOnFirebase();
    }
  }

  /**
   * Adds the current user to Firebase Firestore.
   * Attempts to add the user and logs the result. Handles any errors during the process.
   * Resets the loading state and updates the UI.
   *
   * @async
   * @function addNewUserOnFirebase
   * @returns {Promise<void>} A promise that resolves when the user is added.
   */
  async addNewUserOnFirebase() {
    try {
     await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
      this.dialogRef.close();
    }
  }


  /**
   * Closes the current dialog without taking any action.
   *
   * @function onNoCancel
   * @returns {void}
   */
  onNoCancel(): void {
    this.dialogRef.close();
  }
}
