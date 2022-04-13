import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
// import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { getField, updateField } from 'vuex-map-fields';
import { priority, status } from '@/mocks/contact';
import { SelectType } from '@/interfaces/select';
// import api from '@/api/index.ts';

@Module({ namespaced: true })
export default class User extends VuexModule {
  filterVisibility = false;
  channels: SelectType[] = [];
  priority: SelectType[] = priority;
  status: SelectType[] = status;
  filter_options = {
    channel: '',
    start_time: '',
    takeover_status: '',
    end_time: '',
    status: '',
    priority: '',
    page: 1,
    limit: 10,
    search_input: ''
  };

  @Mutation
  UPDATE_FIELDS(options: { path: string; value: unknown }): unknown {
    return updateField(this, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get GET_FIELDS(): any {
    return getField(this);
  }
}
