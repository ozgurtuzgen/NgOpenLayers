import { Component, OnInit  } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'rest-consume',
  template: `
       <h1>{{title}}</h1>
        <p-dataTable [value]="users" selectionMode="single" [(selection)]="selectedPerson" [responsive]="true">
            <p-column field="id" header="id"  sortable="true"></p-column>
            <p-column field="name" header="Ad" sortable="true"></p-column>
        </p-dataTable>
       `
})
export class RestConsumeComponent implements OnInit {
   title = 'Rest consume deneme';

   users: User[];

   selectedUser : User;

  constructor(private userService: UserService) { }

    getUsers(): void {
           this.userService
              .getUsers()
              .then(users => this.users = users);
   }

   ngOnInit() : void {
      this.getUsers();
  }
}