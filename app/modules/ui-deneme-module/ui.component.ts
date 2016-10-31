import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ui-deneme',
  template: `
    <table>
       <tr>
         <td>
            <person-list-prime id="deneme"></person-list-prime>
         </td>
         <td> 
             <person-list-kendo id="deneme2"></person-list-kendo>
         </td>
       </tr>
       <tr>
         <td></td>
         <td></td>
       </tr>
     </table>

  `,
})
export class UiComponent {

}