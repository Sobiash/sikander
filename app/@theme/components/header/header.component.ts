import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {IDropDown} from '../../../interfaces/IDropDown';
import {TranslateService} from '../../../services/translate.service';
import {dropdown} from './dropdown';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/Role';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private access: Role[] = [];
  private readonly menuStoreLocation: string = 'AccessLevel';
  userPictureOnly: boolean = false;
  public user = {
    actor: null,
    unique_name: 'Anonymous User',
  };

  userMenu: IDropDown[] = dropdown;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService, private router: Router,
              private themeService: NbThemeService, private userService: UserService,
              private authService: NbAuthService, private translate: TranslateService,
              private breakpointService: NbMediaBreakpointsService) {
    this.translate.translateDropdown(dropdown).then(res => this.userMenu = res);
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'user-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe(title => this.handleSelection(title));

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);


    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.userService.getUserAccess().subscribe(res => {
          localStorage.setItem(this.menuStoreLocation, JSON.stringify(res.role.resources));
        });
        this.user = token.getPayload();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }
  async goToSearch() {
    await this.router.navigateByUrl('pages/search');
  }

  handleSelection(label: string): void {
    if (label === this.translate.translate('Log out')) this.router.navigateByUrl('/auth/logout').then(null);
    if (label === this.translate.translate('Profile')) this.router.navigateByUrl('/pages/profile').then(null);
  }
}
