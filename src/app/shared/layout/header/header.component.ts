import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserStorageService} from "../../../core/storage/storage.service";
import {AuthService} from "../../../core/auth/auth.service";
import {NotificationService} from "../../utils/notification.service";
import {I18nService} from "../../i18n/i18n.service";

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo: any;

  constructor(private router: Router,
              private auth: AuthService,
              private storage: UserStorageService,
              private i18n: I18nService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.userInfo = this.storage.get();
  }

  logout() {
    this.auth.logout()
        .subscribe(() => {
          this.router.navigate(['/auth']);
        }, (error) => {
          this.notificationService.smallBox({
            content: this.i18n.getTranslation(error),
            color: "#a90329",
            timeout: 4000,
            icon: "fa fa-warning shake animated"
          })
        })
  }
}
