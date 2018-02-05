import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CampaignsService } from './services/campaigns.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit, OnDestroy {

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
