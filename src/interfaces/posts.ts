export interface PostTypes {
  id: string;
  category_id: string;
  category: CategoriesTypes;
  content: string;
  created_date: string;
  updated_date: string;
  featured_img: string;
  status: string;
  tags: string;
  title: string;
  visibility: string;
}

export interface PostsFilterTypes {
  title: string;
  category_id: string;
  status: string;
  visibility: string;
  start_date: string;
  end_date: string;
  limit: number;
  page: number;
}

export interface CategoriesTypes {
  id: string;
  name: string;
}
