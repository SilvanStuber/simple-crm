import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../../public/models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
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
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  public dialog = inject(MatDialog);

  /**
   * Constructor initializes subscriptions to route parameters and user details.
   * @param {ActivatedRoute} route - The active route that provides access to route parameters.
   */
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    if (this.userId) {
      this.subUserDetail();
    }
  }

  /**
   * Subscribes to the user document snapshot and updates the user detail.
   * This function returns a function to unsubscribe from the snapshot.
   * @returns {Function} Unsubscribe function from the Firestore snapshot.
   */
  subUserDetail() {
    return onSnapshot(doc(this.firestore, 'users', this.userId), (element) => {
      console.log(element.data());
      let user = {
        ...element.data(),
      };
      this.user = new User(user);
    });
  }

  /**
   * Opens a dialog to edit the address information.
   * This method initializes and opens the `DialogEditAddressComponent` to edit the address.
   */
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * Opens a dialog to edit user details.
   * This method initializes and opens the `DialogEditUserComponent` to edit user details.
   */
  editUserDeatail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
