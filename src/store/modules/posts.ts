import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { getField, updateField } from 'vuex-map-fields';
import { ResponseType } from '@/interfaces/common';
import {
  PostTypes,
  PostsFilterTypes,
  CategoriesTypes
} from '@/interfaces/posts';
import api from '@/api/index';

@Module({ namespaced: true })
export default class Posts extends VuexModule {
  categories: CategoriesTypes[] = [];
  posts: PostTypes[] = [];
  posts_total = 6;
  posts_loading = true;
  posts_filter: PostsFilterTypes = {
    title: '',
    category_id: '',
    status: '',
    visibility: '',
    start_date: '',
    end_date: '',
    limit: 6,
    page: 1
  };

  @Mutation
  UPDATE_FIELDS(options: { path: string; value: unknown }): unknown {
    return updateField(this, options);
  }

  @Mutation
  RESET_POSTS_FILTER(): void {
    this.posts_filter = {
      title: '',
      category_id: '',
      status: '',
      visibility: '',
      start_date: '',
      end_date: '',
      limit: 6,
      page: 1
    };
  }

  @Mutation
  SET_CATEGORY(data: CategoriesTypes[]): void {
    this.categories = data;
  }

  @Mutation
  SET_POST(data: any): void {
    this.posts = data.data;
    this.posts_total = data.pagination.total_rows;
  }

  @Mutation
  PUSH_CATEGORY(data: CategoriesTypes): void {
    this.categories.unshift(data);
  }

  @Mutation
  SPLICE_CATEGORY(id: string): void {
    const categoryIndex = this.categories.findIndex((item) => item.id === id);
    this.categories.splice(categoryIndex, 1);
  }

  @Mutation
  EDIT_CATEGORY(payload: CategoriesTypes): void {
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === payload.id
    );
    this.categories[categoryIndex].name = payload.name;
  }

  @Action({ rawError: true })
  async CREATE_NEW_POST(payload: any): Promise<ResponseType> {
    const { data } = await api.posts.create_post(payload);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_POST(payload: any): Promise<ResponseType> {
    const { data } = await api.posts.update_post(payload);
    return data;
  }

  @Action({ rawError: true })
  async DELETE_POST(payload: any): Promise<ResponseType> {
    const { data } = await api.posts.delete_post(payload);
    return data;
  }

  @Action({ rawError: true })
  async GET_POSTS(): Promise<ResponseType> {
    const filterData: any = this.posts_filter;
    const queryString = new URLSearchParams(filterData).toString();
    const { data } = await api.posts.get_post(queryString);
    if (data.code === 201) this.context.commit('SET_POST', data.data);
    return data;
  }

  @Action({ rawError: true })
  async GET_POSTS_DETAIL(id: string): Promise<ResponseType> {
    const { data } = await api.posts.get_post_detail(id);
    return data;
  }

  @Action({ rawError: true })
  async GET_POSTS_CATEGORY(): Promise<ResponseType> {
    const { data } = await api.posts.get_category();
    this.context.commit('SET_CATEGORY', data.data);
    return data;
  }

  @Action({ rawError: true })
  async INSERT_NEW_CATEGORY(payload: object): Promise<ResponseType> {
    const { data } = await api.posts.insert_category(payload);
    if (data.code === 200) {
      this.context.commit('PUSH_CATEGORY', data.data);
    }
    return data;
  }

  @Action({ rawError: true })
  async DELETE_CATEGORY(id: string): Promise<ResponseType> {
    const { data } = await api.posts.delete_category(id);
    if (data.code === 200) {
      this.context.commit('SPLICE_CATEGORY', id);
    }
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_CATEGORY(payload: CategoriesTypes): Promise<ResponseType> {
    const { data } = await api.posts.update_category(payload);
    if (data.code === 200) {
      this.context.commit('EDIT_CATEGORY', payload);
    }
    return data;
  }

  get CATEGORIES(): CategoriesTypes[] {
    return this.categories;
  }

  get POSTS(): PostTypes[] {
    return this.posts;
  }

  get TOTAL_POSTS(): number {
    return this.posts_total;
  }

  get GET_FIELDS(): any {
    return getField(this);
  }
}
