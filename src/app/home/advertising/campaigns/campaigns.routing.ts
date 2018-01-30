import { Routes, RouterModule } from '@angular/router';
import {CampaignsComponent} from "./campaigns.component";
import {ModuleWithProviders} from "@angular/core";

export const campaignsRoutes: Routes = [
    {
        path: '',
        component: CampaignsComponent
    }
];

export const campaignsRouting: ModuleWithProviders = RouterModule.forChild(campaignsRoutes);

