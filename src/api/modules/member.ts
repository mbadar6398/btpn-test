import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

interface ServerResponse {
  data: ResponseType;
}

export default {
  add_member: (data: object): Promise<ServerResponse> =>
    axios.post('/members/add', data),
  update_member: (data: object | any): Promise<ServerResponse> =>
    axios.put(`/members/update/${data.id}`, data),
  get_member: (params: string): Promise<ServerResponse> =>
    axios.get('/members/get?' + params),
  get_detail_member: (id: string): Promise<ServerResponse> =>
    axios.get(`/members/get/${id}`),
  download_periode: (params: string): Promise<ServerResponse> =>
    axios.get(`/members/download-periode?` + params),
  update_saldo: (body: object): Promise<ServerResponse> =>
    axios.post(`/members/update-saldo`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  update_saldo_detail: (body: object): Promise<ServerResponse> =>
    axios.post(`/members/update-saldo-detail`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};
