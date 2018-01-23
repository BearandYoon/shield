
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";


export const routes:Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

export const routing = RouterModule.forChild(routes);
