import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { STMAppComponent }    from './city.component';

const routes: Routes = [
  { path: '', component: STMAppComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule {}