import axios from 'axios';
import { ResponseType } from '@/interfaces/common';

export default {
  getTicketStatusReport: async (): Promise<ResponseType> =>
    axios.get('ticket/total_conversation_unassigned'),

  getTicketHandlerReport: async (): Promise<ResponseType> =>
    axios.get(
      'https://api.matamantra.com/ticket/weekly_count_ticket?end_time=&start_time=&type=DAILY'
    )
};
