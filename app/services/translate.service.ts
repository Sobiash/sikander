import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {ITranslate} from '../interfaces/ITranslate';
import {NbMenuItem} from '@nebular/theme';
import {IDictionaryResponse} from '../interfaces/IDictionaryResponse';
import {IDropDown} from '../interfaces/IDropDown';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
private dictionary: ITranslate[];

  constructor(@Inject(LOCALE_ID) private locale: string) {
    // this.getTranslation(locale).then( res => this.dictionary = res);
  }
  public translateMenu(menu: NbMenuItem[]): Promise<NbMenuItem[]> {
    return this.getTranslation(this.locale).then(response => {
      this.dictionary = response.dictionary;
      for (let i = 0; i < menu.length; i++) {
        menu[i].title = this.translate(menu[i].title);
        if (menu[i].children) {
          for (let c = 0; c < menu[i].children.length; c++) {
            menu[i].children[c].title = this.translate(menu[i].children[c].title);
          }
        }
      }
      return menu;
    });
  }
  public translateDropdown(menu: IDropDown[]): Promise<IDropDown[]> {
    return this.getTranslation(this.locale).then(response => {
      this.dictionary = response.dictionary;
      for (let i = 0; i < menu.length; i++) {
        menu[i].title = this.translate(menu[i].title);
      }
      return menu;
    });
  }
  public translate(source: string): string {
    const index = this.dictionary.findIndex(idx => idx.source === source);
    return index === -1 ? source : this.dictionary[index].target;
  }
  private async getTranslation(locale: string): Promise<IDictionaryResponse> {
    return import(`../../locale/dynamic.${locale}`);
  }
}
