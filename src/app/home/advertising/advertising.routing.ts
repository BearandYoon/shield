import { Routes, RouterModule } from '@angular/router';
import {AdvertisingComponent} from "./advertising.component";
import {ModuleWithProviders} from "@angular/core";

export const advertisingRoutes: Routes = [
    {
        path: '',
        component: AdvertisingComponent,
        children: [
            {
                path: 'campaigns',
                loadChildren: 'app/home/advertising/campaigns/campaigns.module#CampaignsModule'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'campaigns'
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'campaigns'
            }
        ]
    }
];

export const advertisingRouting: ModuleWithProviders = RouterModule.forChild(advertisingRoutes);