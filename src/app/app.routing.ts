/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuardService} from "./core/guards/auth-guard";
import {UnauthGuardService} from "./core/guards/unauth-guard";

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/home/home.module#HomeModule'
            },
        ],
        canActivate: [AuthGuardService]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: 'app/auth/auth.module#AuthModule',
        canActivate: [UnauthGuardService]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
