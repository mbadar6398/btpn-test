import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

export default {
  signin: async (user: object): Promise<ResponseType> =>
    axios.post('/admin/login', user),

  signup: async (user: object): Promise<ResponseType> =>
    axios.post('/register', user),

  forgotPassword: async (args: object): Promise<ResponseType> =>
    axios.post('/forgot_password', args)
};
