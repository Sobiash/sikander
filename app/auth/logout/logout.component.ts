import {Component, OnInit} from '@angular/core';
import {NbLogoutComponent} from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {
  private readonly _token: string = 'auth_app_token';
  private readonly _menuStoreLocation: string = 'AccessLevel';

  ngOnInit() {
    this.router.navigateByUrl('/auth/login').then(() => {
        localStorage.removeItem(this._token);
        localStorage.removeItem(this._menuStoreLocation);
      },
    );
  }

}
