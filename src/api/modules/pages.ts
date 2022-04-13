import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

interface ServerResponse {
  data: ResponseType;
}

export default {
  get_pages: async (queryString: string): Promise<ServerResponse> =>
    axios.get('/page/get?' + queryString)
};
