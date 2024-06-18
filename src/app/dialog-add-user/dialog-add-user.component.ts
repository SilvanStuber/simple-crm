import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
import {
  Firestore,
  collection,
  docData,
  doc,
  updateDoc,
  addDoc,
} from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
    MatProgressBarModule
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
 * Asynchronously saves the current user to the database.
 * If the user has a birth date, it is converted to a timestamp before saving.
 * Displays loading indicator during the save process.
 *
 * @async
 * @function saveUser
 * @returns {Promise<void>}
 */
  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      this.loading = true;
      this.cdr.detectChanges();
      try {
        const result = await addDoc(this.getUserRef(), this.user.toJSON());
        console.log('Adding user finishes', result);
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        this.loading = false;
        this.cdr.detectChanges();
      }
      console.log('Current user', this.user);
    }
  }

  /**
   * Retrieves the reference to the 'users' collection in Firestore.
   * @returns {CollectionReference} A reference to the 'users' collection.
   */
  getUserRef() {
    return collection(this.firestore, 'users');
  }

  onNoCancel(): void {
    this.dialogRef.close();
  }
}
