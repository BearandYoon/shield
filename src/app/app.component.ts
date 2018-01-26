import { Component } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Router } from '@angular/router';
import { NotificationService } from "./shared/utils/notification.service";
import { AuthService } from "./core/auth/auth.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import constants from "./shared/constants";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  public constructor(private auth: AuthService,
                     private router: Router) {}

  interval = constants.STATUS_CHECK_INTERVAL;
  authSubscription: Subscription;
  checkStatusSubscription: Subscription;

  ngOnInit() {
    this.authSubscription = this.auth.loginStatusChange
        .subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.checkStatusSubscription = TimerObservable.create(this.interval, this.interval)
                .switchMap(() => this.auth.checkStatus())
                .subscribe(
                    () => {},
                    () => { this.router.navigate(['/auth']); }
                );
          } else if (this.checkStatusSubscription) {
            this.checkStatusSubscription.unsubscribe();
          }
        });
  }

}
