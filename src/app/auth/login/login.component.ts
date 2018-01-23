import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from "../../shared/utils/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required],
      persist: true
    })
  }

  login(data) {
    this.loading = true;
    this.auth.login(data)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/home']);
        }, (error) => {
          this.loading = false;
          this.notificationService.smallBox({
            content: error,
            color: "#a90329",
            timeout: 4000,
            icon: "fa fa-warning shake animated"
          })
        })
  }

}
