import {NbAuthJWTToken, NbAuthOptions, NbPasswordAuthStrategy} from '@nebular/auth';
import {environment} from '../../environments/environment';

export interface NbAuthSocialLink {
  link?: string;
  url?: string;
  target?: string;
  title?: string;
  icon?: string;
}

export interface IFormSettings {
    redirectDelay: number;
    strategy: string;
    showMessages: {
      success: boolean;
      error: boolean;
    };
    socialLinks: NbAuthSocialLink;
}

const formSettings: IFormSettings = {
  redirectDelay: 0,
  strategy: 'email',
  socialLinks: null,
  showMessages: {
    error: true,
    success: true,
  },
};

export const authStrategy: NbAuthOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      token: {
        class: NbAuthJWTToken,
        key: 'token',
      },
      baseEndpoint: environment.api,
      login: {
        method: 'post',
        endpoint: '/users/auth',
        redirect: {
          success:  '/pages/dashboard',
          failure: null,
        },
      },
    }),
  ],
  forms: {
    login: formSettings,
    register: formSettings,
    requestPassword: formSettings,
    resetPassword: formSettings,
    logout: formSettings,
    validation: {
      password: {
        required: true,
        minLength: 6,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};
