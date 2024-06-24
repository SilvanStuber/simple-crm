import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../../public/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  public dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  loading = false;
  birthDate!: Date;
  userId = '';

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Closes the current dialog without taking any action.
   *
   * @function onNoCancel
   * @returns {void}
   */
  onNoCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Saves the user by initiating the update process on Firebase and updating the UI in the meantime.
   * This function sets the loading flag, requests a UI update, and waits for the Firebase update to complete.
   */
  async saveUser() {
    this.loading = true;
    this.cdr.detectChanges();
    if (this.userId) {
      await this.updateUserOnFirebase();
    } else {
      console.error('User ID empty');
    }
  }

  /**
   * Updates user information in Firebase.
   * This asynchronous function logs the `userId`, updates the user document in Firebase, and handles potential errors.
   * After a successful update, the loading flag is reset and the dialog is closed.
   */
  async updateUserOnFirebase() {
    console.log(this.userId);
    await updateDoc(
      doc(collection(this.firestore, 'users'), this.userId),
      this.user.toJSON()
    )
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.loading = false;
        this.cdr.detectChanges();
        this.dialogRef.close();
      });
  }
}
