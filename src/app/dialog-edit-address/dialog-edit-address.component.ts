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
   * Speichert den Benutzer, indem es den Update-Prozess auf Firebase initiiert und das UI währenddessen aktualisiert.
   * Diese Funktion setzt das Lade-Flag, fordert eine UI-Aktualisierung an und wartet auf den Abschluss des Firebase-Updates.
   */
  async saveUser() {
    this.loading = true;
    this.cdr.detectChanges();
    await this.updateUserOnFirebase();
  }

  /**
   * Aktualisiert die Benutzerinformationen in Firebase.
   * Diese asynchrone Funktion loggt die `userId`, aktualisiert das Benutzerdokument in Firebase und handhabt mögliche Fehler.
   * Nach erfolgreichem Update wird das Laden-Flag zurückgesetzt und das Dialogfenster geschlossen.
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
