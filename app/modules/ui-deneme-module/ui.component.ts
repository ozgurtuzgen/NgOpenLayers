import { Component } from '@angular/core';
import {PersonListComponentPrime} from "./person-list-prime.component"

@Component({
  moduleId: module.id,
  selector: 'ui-deneme',
  template: `
    <div>
       <person-list-prime id="deneme"></person-list-prime>
    </div>
  `,
})
export class UiComponent {

}