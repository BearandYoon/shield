import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password_md5: ['',  Validators.required]
    })
  }

  login(data){
    this.error = '';
    this.auth.login(data)
        .subscribe(() => {
          this.router.navigate(['/home']);
        }, (error) => {
          this.error = error;
        })
  }

}
