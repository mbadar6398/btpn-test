import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { ResponseType } from '@/interfaces/common';
import api from '@/api/index';

interface PagesTypes {
  id: string;
  has_child: boolean;
  parent_id: string;
  children: PagesTypes[];
  name: string;
  slug: string;
  title_tag: string;
  meta_description: string;
  meta_keywords: string;
  visibility: string;
  status: string;
  order_seq: number;
}

@Module({ namespaced: true })
export default class Pages extends VuexModule {
  pages: PagesTypes[] = [];
  total = 0;
  selected_page: any = null;
  selected_child_page: any = null;

  @Mutation
  SELECT_PAGE(id: string): void {
    this.selected_page = this.pages.find((item) => item.id === id);
  }

  @Mutation
  SELECT_CHILD_PAGE(id: string): void {
    if (id !== '') {
      const parent: any = this.pages.find(
        (item) => item.id === this.selected_page.id
      );
      this.selected_child_page = parent.children.find(
        (item: any) => item.id === id
      );
    }
  }

  @Mutation
  SET_PAGES(data: PagesTypes[]): void {
    this.pages = data;
  }

  @Action({ rawError: true })
  async GET_PAGES(): Promise<ResponseType> {
    const { data } = await api.pages.get_pages('');
    return data;
  }

  get PAGES(): PagesTypes[] {
    return this.pages;
  }

  get SELECTED_PAGE(): PagesTypes[] {
    return this.selected_page;
  }

  get SELECTED_CHILD_PAGE(): PagesTypes[] {
    return this.selected_child_page;
  }
}
