import {Component} from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import {TranslateService} from '../services/translate.service';
import {NbMenuItem} from '@nebular/theme';
import {Resource} from '../models/Resource';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  private readonly menuStoreLocation: string = 'AccessLevel';
  // menu = MENU_ITEMS;
  menu: NbMenuItem[] = [];
  constructor(private translate: TranslateService) {
    setTimeout(() => {
      this.getAccessLevels().then(roles =>
        this.processMenu(MENU_ITEMS, roles).then(m => {
          translate.translateMenu(m).then(resp => this.menu = resp);
        }));
    }, 1000);
  }

  private async processMenu(menu: NbMenuItem[], roles: Resource[]): Promise<NbMenuItem[]> {
    const _menu: NbMenuItem[] = [];
      for (let m = 0; m < menu.length; m++) {
        if (roles.find(r => r.name === menu[m].title.toLowerCase())) _menu.push(menu[m]);
      }
    return _menu;
  }
  private async getAccessLevels(): Promise<Resource[]> {
    return JSON.parse(await localStorage.getItem(this.menuStoreLocation));
  }

}
