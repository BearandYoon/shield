import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { campaignsRouting } from './campaigns.routing';
import { CampaignsComponent } from "./campaigns.component";

@NgModule({
    imports: [
        CommonModule,
        campaignsRouting
    ],
    declarations: [CampaignsComponent]
})
export class CampaignsModule { }
