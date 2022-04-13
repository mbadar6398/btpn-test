import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { ResponseType } from '@/interfaces/common';
// import { getField, updateField } from 'vuex-map-fields';
import api from '@/api/index';

interface SectionTypes {
  id: string;
  page_id: boolean;
  has_item: boolean;
  type: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
  background_responsive: string;
  icon: string;
  background_size: string;
  background_responsive_size: string;
  icon_size: string;
  background_item_size: string;
  background_item_responsive_size: string;
  icon_item_size: string;
  configuration: string;
  item_configuration: string;
  visibility: boolean;
  order_seq: number | string;
  created_date: string;
  updated_date: string;
}

interface SectionItemsTypes {
  id: string;
  section_id: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
  background_responsive: string;
  order_seq: number | string;
  created_date: string;
  updated_date: string;
}

@Module({ namespaced: true })
export default class Sections extends VuexModule {
  selected_section: SectionTypes | null = null;
  sections: SectionTypes[] = [];
  section_items: SectionItemsTypes[] = [];
  selected_section_item: SectionItemsTypes | null = null;
  get_sections_loading = false;
  get_section_detail_loading = true;
  get_section_items_loading = true;

  // SECTIONS
  @Mutation
  SET_SECTIONS(data: SectionTypes[]): void {
    this.sections = data;
  }

  @Mutation
  SET_GET_SECTIONS_LOADING(val: boolean): void {
    this.get_sections_loading = val;
  }

  @Mutation
  SET_GET_SECTION_DETAIL_LOADING(val: boolean): void {
    this.get_section_detail_loading = val;
  }

  @Mutation
  SET_SELECTED_SECTION(item: any): void {
    this.selected_section = item;
  }

  @Mutation
  SET_SELECTED_SECTION_ITEM(data: SectionItemsTypes): void {
    this.selected_section_item = data;
  }

  @Mutation
  SET_GET_SECTION_ITEMS_LOADING(payload: boolean): void {
    this.get_section_items_loading = payload;
  }

  @Mutation
  SET_SECTION_ITEMS(data: SectionItemsTypes[]): void {
    this.section_items = data;
  }

  @Action({ rawError: true })
  async ADD_SECTION_ITEM(payload: any): Promise<ResponseType> {
    const { data } = await api.sections.add_section_item(payload);
    return data;
  }

  @Action({ rawError: true })
  async GET_SECTIONS(payload: any): Promise<ResponseType> {
    this.context.commit('SET_GET_SECTIONS_LOADING', true);
    this.context.commit('SET_SECTIONS', []);
    const queryString = new URLSearchParams(payload).toString();
    const { data } = await api.sections.get_sections(queryString);
    this.context.commit('SET_SECTIONS', data.data);
    this.context.commit('SET_GET_SECTIONS_LOADING', false);
    return data;
  }

  @Action({ rawError: true })
  async GET_SECTION_DETAIL(id: any): Promise<ResponseType> {
    const { data } = await api.sections.get_section_detail(id);
    return data;
  }

  @Action({ rawError: true })
  async GET_SECTION_ITEM(id: any): Promise<ResponseType> {
    const { data } = await api.sections.get_section_item(id);
    return data;
  }

  @Action({ rawError: true })
  async GET_SECTION_ITEMS(id: string): Promise<ResponseType> {
    this.context.commit('SET_GET_SECTION_ITEMS_LOADING', true);
    this.context.commit('SET_SECTION_ITEMS', []);
    const { data } = await api.sections.get_section_items(id);
    this.context.commit('SET_SECTION_ITEMS', data.data);
    this.context.commit('SET_GET_SECTION_ITEMS_LOADING', false);
    return data;
  }

  @Action({ rawError: true })
  async DECREASE_SECTION_ITEM_ODER(id: string): Promise<ResponseType> {
    const { data } = await api.sections.decrease_section_item_order(id);
    return data;
  }

  @Action({ rawError: true })
  async INCREASE_SECTION_ITEM_ODER(id: string): Promise<ResponseType> {
    const { data } = await api.sections.increase_section_item_order(id);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_SECTION_ITEM(payload: any): Promise<ResponseType> {
    const { data } = await api.sections.update_section_item(payload);
    return data;
  }

  @Action({ rawError: true })
  async DELETE_SECTION_ITEM(id: string): Promise<ResponseType> {
    const { data } = await api.sections.delete_section_item(id);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_SECTION_INFO(payload: any): Promise<ResponseType> {
    const { data } = await api.sections.update_section(payload);
    return data;
  }

  get SECTIONS(): SectionTypes[] {
    return this.sections;
  }

  get SELECTED_SECTION(): SectionTypes | null {
    return this.selected_section;
  }

  get GET_SECTIONS_LOADING(): boolean {
    return this.get_sections_loading;
  }

  get GET_SECTION_DETAIL_LOADING(): boolean {
    return this.get_section_detail_loading;
  }

  get GET_SECTION_ITEMS_LOADING(): boolean {
    return this.get_section_items_loading;
  }

  get SECTION_ITEMS(): SectionItemsTypes[] {
    return this.section_items;
  }

  get SELECTED_SECTION_ITEM(): SectionItemsTypes | null {
    return this.selected_section_item;
  }
}
