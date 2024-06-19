import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
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
import {
  Firestore,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { User } from '../../../public/models/user.class';

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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  unsubUserDetail;
  userId = '';
  userDetail: User = new User();
  firestore: Firestore = inject(Firestore);

  /**
   * Constructor initializes subscriptions to route parameters and user details.
   * @param {ActivatedRoute} route - The active route that provides access to route parameters.
   */
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.unsubUserDetail = this.subUserDetail();
  }

  /**
   * Subscribes to the user document snapshot and updates the user detail.
   * This function returns a function to unsubscribe from the snapshot.
   * @returns {Function} Unsubscribe function from the Firestore snapshot.
   */
  subUserDetail() {
    return onSnapshot(doc(this.firestore, 'users', this.userId), (element) => {
      console.log(element.data());
      let userData = {
        ...element.data(),
      };
      this.userDetail = new User(userData);
      console.log('this.userDetail', this.userDetail);
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the user detail subscription to prevent memory leaks.
   */
  ngOnDestroy() {
    this.unsubUserDetail();
  }
}
