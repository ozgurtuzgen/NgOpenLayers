import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { BasicComponent }    from './basic.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'basic', component: BasicComponent}
  ])],
  exports: [RouterModule]
})
export class BasicRoutingModule {}