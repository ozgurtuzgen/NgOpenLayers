import { Component, OnInit  } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'rest-consume',
 /* template: `
       <h1>{{title}}</h1>
     <ul>
      <li *ngFor="let user of users"
        <span>{{user.id}}</span> {{user.name}}
      </li>
    </ul>
  `,*/
   providers: [UserService],
   template: `
       <h1>{{title}}</h1>
       `
})
export class RestConsumeComponent implements OnInit {
  title = 'Rest consume deneme';

   users: User[];

  constructor(private userService: UserService) { }

    getUsers(): void {
           this.userService
              .getUsers()
              .then(users => this.users = users);
   }

   ngOnInit() : void {
      this.getUsers();
      console.log(this.users);
  }
}