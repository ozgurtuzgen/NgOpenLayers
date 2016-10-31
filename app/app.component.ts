import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
       <nav>
         <a routerLink="basic" routerLinkActive="active"><h1>Basic</h1></a>
         <a routerLink="city"  routerLinkActive="active"><h1>Cities With Map</h1></a>
         <a routerLink="ui-deneme"  routerLinkActive="active"><h1>UI Library Denemeleri</h1></a>
       </nav>
       <h1>{{title}}</h1>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Root Module, modulden modüle değişmeyen kısımlar. Ana layout gibi.';
}