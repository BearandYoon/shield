import { Component, OnInit} from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import constants from './core/core.constants';
import { LoadingIndicatorService} from './core/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-root',
  template: `
      <app-loading-indicator [hidden]="!loadingIndicator.show"></app-loading-indicator>
      <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

    interval = constants.STATUS_CHECK_INTERVAL;
    authSubscription: Subscription;
    checkStatusSubscription: Subscription;

    constructor (
        private auth: AuthService,
        private router: Router,
        public loadingIndicator: LoadingIndicatorService
    ) {}

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
