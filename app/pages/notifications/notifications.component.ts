import {Component, OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Notifications} from '../../models/Notifications';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  public notifications: Notifications[] = [];
  public notification: Notifications;
  public newNotification: boolean = true;
  public existingId: string = '';
  public Editor = DecoupledEditor;

  constructor(private service: NotificationsService) {
    this.new();
  }


  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
    );
  }

  ngOnInit() {
    this.getAll().then(() => this.checkForInitial());
  }

  async getAll() {
    this.service.getAll().subscribe(res => {this.notifications = res; this.checkForInitial(); });
  }

  async edit(index: number) {
    this.notification = this.notifications[index];
    this.newNotification = false;
  }

  async save() {
    this.newNotification ? this.service.create(this.notification).subscribe(() => this.getAll().then(() => this.new()))
      : this.service.update(this.notification).subscribe(() => this.getAll().then(() => this.new()));
  }

  new() {
    this.notification = {
      name: '',
      body: '',
      subject: '',
      active: false,
      id: '',
      condition: 'progress',
      notify: false,
    };
    this.newNotification = true;
  }

  async delete() {
    this.service.delete(this.notification).subscribe(() => this.getAll());
  }
  private async checkForInitial() {
    const index = this.notifications.findIndex(not => not.condition === 'initial');
    this.existingId = this.notifications[index] ? this.notifications[index].id : '';
  }
}
