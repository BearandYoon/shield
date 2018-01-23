import {Component, OnInit} from '@angular/core';
import {UserStorageService} from "../../../core/storage/storage.service";

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navigation: any;

  constructor(private storage: UserStorageService) {
  }

  ngOnInit() {
    this.navigation = this.storage.get().navigation;
    console.log(this.navigation);
  }

}
