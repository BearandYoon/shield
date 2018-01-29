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
                path: 'advertising/campaigns',
                loadChildren: 'app/home/advertising/campaigns/campaigns.module#CampaignsModule'
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

