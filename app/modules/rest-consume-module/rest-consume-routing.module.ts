import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RestConsumeComponent }    from './rest-consume.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'rest', component: RestConsumeComponent}
  ])],
  exports: [RouterModule]
})
export class RestConsumeRoutingModule {}