import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from "../../shared/utils/notification.service";
import { environment } from '../../../environments/environment';
import { ReCaptchaComponent } from "angular2-recaptcha";
import { I18nService } from "../../shared/i18n/i18n.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  loginForm: FormGroup;
  loading = false;
  googleKey = environment.googleSiteKey;

  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              private i18n: I18nService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required],
      persist: true
    })
  }

  login(captcha, data) {
    if (!captcha) {
      this.notificationService.smallBox({
        content: this.i18n.getTranslation('Problems with captcha'),
        color: "#a90329",
        timeout: 4000,
        icon: "fa fa-warning shake animated"
      });
    } else {
      this.loading = true;

      this.auth.login({...data, captcha})
          .subscribe(() => {
            this.loading = false;
            this.router.navigate(['/home']);
          }, (error) => {
            this.loading = false;
            this.captcha.reset();
            this.notificationService.smallBox({
              content: this.i18n.getTranslation(error),
              color: "#a90329",
              timeout: 4000,
              icon: "fa fa-warning shake animated"
            })
          })
    }
  }

  submitForm() {
    this.captcha.execute();
  }

}
