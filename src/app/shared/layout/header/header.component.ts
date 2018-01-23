import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserStorageService} from "../../../core/storage/storage.service";
import {AuthService} from "../../../core/auth/auth.service";

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo: any;

  constructor(private router: Router, private auth: AuthService, private storage: UserStorageService) {
  }

  ngOnInit() {
    this.userInfo = this.storage.get();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
