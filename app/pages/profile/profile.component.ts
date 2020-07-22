import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogService, NbThemeService, NbToastrService} from '@nebular/theme';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {NewItemModalComponent} from '../new-item-modal/new-item-modal.component';
import {UserForm} from '../../models/UserForm';
import {themeList} from './ThemeList';
import {ILanguage} from '../../interfaces/ILanguage';
import {languageList} from './languageList';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  themes = themeList;
  currentTheme = 'default';
  private destroy$: Subject<void> = new Subject<void>();
  public smallProfile: boolean = false;
  public me: User = new User();
  public form: UserForm = new UserForm();
  public loading: boolean = true;
  public languages: ILanguage[] = languageList;
  smallLocation: boolean = false;
  repeat: string = '';
  public loadingString: string = $localize`Loading...`;

  constructor(
    private themeService: NbThemeService,
    private toast: NbToastrService,
    private cdr: ChangeDetectorRef,
    private user: UserService,
    private dialogService: NbDialogService) { }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
  async toggleProfile(): Promise<void> {
    this.smallProfile = !this.smallProfile;
    this.cdr.detectChanges();
  }
  async toggleLocation(): Promise<void> {
    this.smallLocation = !this.smallLocation;
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    this.getMe().then(null);
  }

  private async getMe(): Promise<void> {
    this.user.getMe().subscribe(u => {
      this.me = u;
      this.user.getForm().subscribe(f => {
        this.form = f;
        this.loading = false;
      });
    });
  }

  async saveProfile() {
    this.user.updateMe(this.me).subscribe(u => {
      this.me = u;
      this.toast.success('User saved', 'Success');
    }, e => this.toast.danger(e.message, 'Error!'));
  }

  async newSite(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Site Name'}})
      .onClose.subscribe(name => name && this.form.site.push(name));
  }
  async newSubSite(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Sub-Site Name'}})
      .onClose.subscribe(name => name && this.form.subSite.push(name));
  }
  async newBuilding(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Building Name'}})
      .onClose.subscribe(name => name && this.form.building.push(name));
  }
  async newFloor(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Floor Number'}})
      .onClose.subscribe(name => name && this.form.floor.push(name));
  }
  async newDepartment(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Department Name'}})
      .onClose.subscribe(name => name && this.form.department.push(name));
  }
  async newCostCenter(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Cost Center'}})
      .onClose.subscribe(name => name && this.form.costCenter.push(name));
  }
  async newMailDrop(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Mail Drop Name'}})
      .onClose.subscribe(name => name && this.form.mailDrop.push(name));
  }
  async newMailStop(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Mail Stop Name'}})
      .onClose.subscribe(name => name && this.form.mailStop.push(name));
  }
  async newLanguage(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: { title: 'Provide New Language'}})
      .onClose.subscribe(name => name && this.form.language.push(name));
  }
}
