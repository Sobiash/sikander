import {TranslateService} from '../../services/translate.service';

export class TableSettings {
  constructor(private translate: TranslateService) {
  }
  public readonly get = {
    mode: 'external',
    hideHeader: true,
    actions: {
      add: false,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: this.translate.translate('First Name'),
        type: 'string',
      },
      lastName: {
        title: this.translate.translate('Last Name'),
        type: 'string',
      },
      phoneNumber: {
        title: this.translate.translate('Phone'),
        type: 'string',
      },
      emailAddress: {
        title: this.translate.translate('Email'),
        type: 'string',
      },
      department: {
        title: this.translate.translate('Department'),
        type: 'string',
      },
    },
  };
}
