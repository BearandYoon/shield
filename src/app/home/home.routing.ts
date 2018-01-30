import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {ModuleWithProviders} from "@angular/core";

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/home/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'advertising',
                loadChildren: 'app/home/advertising/advertising.module#AdvertisingModule'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    },
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

