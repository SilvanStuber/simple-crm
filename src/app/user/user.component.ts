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
import {
  Firestore,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';


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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ];
  position = new FormControl(this.positionOptions[0]);
  readonly dialog = inject(MatDialog);
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  allUsers: User[] = [];

  ngOnInit() {
    onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach(element => {  
        let data = {
          ...element.data(),
          id: element.id
        }
        this.allUsers.push(new User(data))
        console.log('User read from this.allUsers', this.allUsers)
      });
    });
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}