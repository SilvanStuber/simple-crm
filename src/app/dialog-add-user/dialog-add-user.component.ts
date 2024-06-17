import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  /**
   * Asynchronously saves the user data.
   * If the birth date is provided, it converts the date to a timestamp
   * and saves the user document to the database.
   * Logs the result of the add operation and the current user to the console.
   * @returns {Promise<void>}
   */
  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      await addDoc(this.getUserRef(), this.user.toJSON()).then(
        (result: any) => {
          console.log('Adding user finisihes', result);
        }
      );
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
