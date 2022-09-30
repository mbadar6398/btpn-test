import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { UserInterface, UserPayload } from '@/interfaces/user';

@Module({ namespaced: true })
export default class User extends VuexModule {
  userInfo: UserInterface | null = null;

  @Mutation
  UPDATE_USER_INFO(args: any): void {
    this.userInfo = args;
  }

  @Action({ rawError: true })
  SIGN_IN(args: UserPayload): UserInterface {
    const mockResult = {
      id: 'd2h8dh-d28d2hd82-d2h8d2h9-d92h9',
      fullname: 'Muhammad Badar',
      jobrole: 'Senior Software Engineer',
      token: '$dasdkjaso219hdnijwdknsad98qasdhasodisaldkn',
      email: 'admin@test.com'
    };

    if (args.email !== 'admin@test.com' || args.password !== 'admin') {
      throw new Error('Incorrect username or password');
    } else {
      this.context.commit('UPDATE_USER_INFO', mockResult);
      return mockResult;
    }
  }

  @Action
  async LOGOUT(): Promise<void> {
    this.context.commit('UPDATE_USER_INFO', null);
  }

  get USER_INFO(): UserInterface | null {
    return this.userInfo;
  }

  get TOKEN(): string {
    return this.userInfo ? this.userInfo.token : '';
  }
}
