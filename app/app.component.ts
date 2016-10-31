import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
       <nav>
         <a routerLink="basic" routerLinkActive="active">Basic</a>
         <a routerLink="city"  routerLinkActive="active">Cities With Map</a>
       </nav>
       <h1>{{title}}</h1>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'App';
}