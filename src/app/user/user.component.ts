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
      list.forEach(element => {
        console.log('User read from DB', element.data())
        this.allUsers.push(this.setUserObject(element.data(), element.id))
      });
    });
  } 


setUserObject(obj: any, id: string): User {
  let data = {
    id: id,
    firstName: obj['firstName'] || '',
    lastName: obj.lastName || '',
    birthDate: obj.birthDate || '',
    street: obj.street|| '',
    zipCode: obj.zipCode || '',
    city: obj.city|| '',
  };

  return new User(data)
}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
}