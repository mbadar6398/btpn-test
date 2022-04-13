import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

interface ServerResponse {
  data: ResponseType;
}

export default {
  get_sections: async (payload: any): Promise<ServerResponse> =>
    axios.get('/sections/get?' + payload),
  get_section_detail: async (id: number): Promise<ServerResponse> =>
    axios.get('/sections/get/' + id),
  get_section_item: async (id: number): Promise<ServerResponse> =>
    axios.get('/sections/item/get/' + id),
  get_section_items: async (id: any): Promise<ServerResponse> =>
    axios.get('/sections/get/items/' + id),
  update_section: async (payload: any): Promise<ServerResponse> =>
    axios.put('/sections/update', payload),
  add_section_item: async (payload: any): Promise<ServerResponse> =>
    axios.post('/sections/item/add', payload),
  update_section_item: async (payload: any): Promise<ServerResponse> =>
    axios.put('/sections/item/update/' + payload.id, payload),
  delete_section_item: async (id: string): Promise<ServerResponse> =>
    axios.delete('/sections/item/delete/' + id),
  decrease_section_item_order: async (id: string): Promise<ServerResponse> =>
    axios.put('/sections/item/decrease-order/' + id),
  increase_section_item_order: async (id: string): Promise<ServerResponse> =>
    axios.put('/sections/item/increase-order/' + id)
};
