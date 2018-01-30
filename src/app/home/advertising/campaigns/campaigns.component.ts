import { Component, OnInit } from '@angular/core';
import { CampaignsService } from "./services/campaigns.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns: any[];
  campaignsSubscription: Subscription;
  loading = false;

  constructor(private campaignsService: CampaignsService) { }

  ngOnInit() {
    this.campaignsSubscription = this.campaignsService.getCampaigns()
        .subscribe((campaigns: any[]) => {
          this.campaigns = campaigns;
        })
  }

  ngOnDestroy() {
    this.campaignsSubscription.unsubscribe();
  }

}
