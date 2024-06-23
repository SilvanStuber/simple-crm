import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../../public/models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatCardModule,
    CommonModule,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  unsubUserList;
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ];
  position = new FormControl(this.positionOptions[0]);
  public dialog = inject(MatDialog);
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  allUsers: User[] = [];

  constructor() {
    this.unsubUserList = this.subUserList();
  }

  /**
   * Initializes component by setting up a snapshot listener on the 'users' collection from Firestore.
   * Updates `allUsers` array with `User` instances representing each document in the collection.
   * Each `User` instance is created from the document's data, including a unique ID.
   */
  subUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        console.log(element.data())
        let userData = {
          ...element.data(),
          idUser: element.id,
        };
        this.allUsers.push(new User(userData));
      });
    });
  }

  /**
   * Opens a dialog window to add a new user using the `DialogAddUserComponent`.
   */
  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  /**
 * Unsubscribes from user list to prevent memory leaks.
 * This method is called automatically by Angular just before the component is destroyed.
 */
  ngOnDestroy() {
    this.unsubUserList();
  }
}
