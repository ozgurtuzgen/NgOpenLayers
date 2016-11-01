import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'basic',
  template: `
       <h1>{{title}}</h1>
  `,
})
export class BasicComponent {
  title = 'Basic Module, Root Module ile birlikte yüklenen ilk modul. Şimdilik buraya birşey eklemedik.';
}