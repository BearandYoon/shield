import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { campaignsRouting } from './campaigns.routing';
import { CampaignsComponent } from "./campaigns.component";
import {CampaignsService} from "./services/campaigns.service";

@NgModule({
    imports: [
        CommonModule,
        campaignsRouting
    ],
    declarations: [CampaignsComponent],
    providers: [CampaignsService]
})
export class CampaignsModule { }
