import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'basic', redirectTo: 'basic', pathMatch: 'full'},
  { path: '', loadChildren: 'app/modules/city-module/city.module#CityModule' },
  { path: 'ui-deneme', loadChildren: 'app/modules/ui-deneme-module/ui.module#UiModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}