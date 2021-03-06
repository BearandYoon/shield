import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";
import { UserStorageService } from 'app/core/storage/storage.service';
import { Md5 } from 'ts-md5';
import { environment } from 'environments/environment';

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css'],
})
export class LoginInfoComponent implements OnInit {

  user:any;
  isShow = false;

  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private storage: UserStorageService,
  ) {}

  ngOnInit() {
    this.layoutService.subscribeAni(inf => {
      this.isShow = !inf.minified;
    });

    this.user = this.storage.get().user;
    let md5Hashed = Md5.hashStr(this.user.email);
    let avatarDef = "https://shield.stage.amalyze.com/" +  environment.version + "/dist/assets/img/avatars/male.png&s=38";
    if(!this.user['picture']) {
      this.user['picture'] = "https://www.gravatar.com/avatar/" + md5Hashed + "?d=" + avatarDef;
    }
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
