import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ui-deneme',
  template: `
       <h1>{{title}}</h1>
  `,
})
export class UiComponent {
  title = 'aaa';
}