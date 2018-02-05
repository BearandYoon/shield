import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../shared/utils/notification.service';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { I18nService} from '../../shared/i18n/i18n.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  resetForm: FormGroup;
  loading = false;
  googleKey = environment.googleSiteKey;

  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              private i18n: I18nService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  reset(captcha, data) {
    if (!captcha) {
      this.notificationService.smallBox({
        content: this.i18n.getTranslation('Problems with captcha'),
        color: '#a90329',
        timeout: 4000,
        icon: 'fa fa-warning shake animated'
      });
    } else {
      this.loading = true;
      this.auth.resetPassword({...data, captcha})
          .subscribe(() => {
            this.loading = false;
            this.notificationService.smallBox({
              content: this.i18n.getTranslation('An email has been sent to you'),
              timeout: 4000,
              icon: 'fa fa-bell swing animated'
            });
            this.resetForm.reset();
            this.captcha.reset();
          }, (error) => {
            this.loading = false;
            this.notificationService.smallBox({
              content: this.i18n.getTranslation(error),
              color: '#a90329',
              timeout: 4000,
              icon: 'fa fa-warning shake animated'
            });
          })
    }
  }

  submitForm() {
    this.captcha.execute();
  }
}
