import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { UserInterface } from '@/interfaces/user';
import { ResponseType } from '@/interfaces/common';
import { getField, updateField } from 'vuex-map-fields';
import api from '@/api/index';
import axios from 'axios';

@Module({ namespaced: true })
export default class User extends VuexModule {
  userInfo: UserInterface | null = null;
  loginStatus = false;

  @Mutation
  UPDATE_USER_LOGIN(args: UserInterface): void {
    if (args === null) {
      this.userInfo = null;
      this.loginStatus = false;
    } else {
      this.userInfo = args;
      this.loginStatus = true;
    }
  }

  @Mutation
  UPDATE_FIELDS(options: { path: string; value: unknown }): unknown {
    return updateField(this, options);
  }

  @Action
  async SIGN_IN(args: object): Promise<ResponseType> {
    return await api.user.signin(args);
  }

  @Action
  async LOGOUT(): Promise<void> {
    this.context.commit('UPDATE_USER_LOGIN', null);
  }

  @Action
  SUCCESS_LOGIN(args: UserInterface): void {
    if (args) {
      axios.defaults.headers.common.Authorization = args.token;
    }
    this.context.commit('UPDATE_USER_LOGIN', args);
  }

  get LOGIN_STATUS(): boolean {
    return this.loginStatus;
  }
  get TOKEN(): string {
    return this.userInfo ? this.userInfo.token : '';
  }
  get GET_FIELDS(): any {
    return getField(this);
  }
}