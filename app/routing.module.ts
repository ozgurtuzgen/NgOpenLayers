import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full'},
  { path: 'city', loadChildren: 'app/modules/city-module/city.module#CityModule' },
  { path: 'ui-deneme', loadChildren: 'app/modules/ui-deneme-module/ui.module#UiModule' },
  { path: 'rest', redirectTo: 'rest', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}