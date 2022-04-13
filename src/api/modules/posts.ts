import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

interface ServerResponse {
  data: ResponseType;
}

export default {
  create_post: async (payload: any): Promise<ServerResponse> =>
    axios.post('/posts/create-post', payload),
  update_post: async (payload: any): Promise<ServerResponse> =>
    axios.put('/posts/update-post/' + payload.id, payload),
  delete_post: async (id: any): Promise<ServerResponse> =>
    axios.delete('/posts/delete-post/' + id),
  get_post: async (payload: string): Promise<ServerResponse> =>
    axios.get('/posts/get-post?' + payload),
  get_post_detail: async (id: string): Promise<ServerResponse> =>
    axios.get('/posts/get-post-detail/' + id),
  get_category: async (): Promise<ServerResponse> =>
    axios.get('/posts/get-category'),
  insert_category: async (payload: object): Promise<ServerResponse> =>
    axios.post('/posts/insert-category', payload),
  delete_category: async (id: string): Promise<ServerResponse> =>
    axios.delete('/posts/delete-category/' + id),
  update_category: async (payload: any): Promise<ServerResponse> =>
    axios.put('/posts/update-category/' + payload.id, { name: payload.name })
};
