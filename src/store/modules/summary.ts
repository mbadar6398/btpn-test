import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
// import { UserInterface } from '@/interfaces/user.ts';
import { ResponseType } from '@/interfaces/common';
import api from '@/api/index';
import { TicketStatus, TicketHandler } from '@/interfaces/summary';

@Module({ namespaced: true })
export default class Summary extends VuexModule {
  ticketStatus: TicketStatus = {
    total_bot: -1,
    total_closed: -1,
    total_conversation: -1,
    total_open: -1,
    total_pending: -1,
    total_ticket: -1,
    total_unassigned: -1
  };
  ticketHandler: any = {
    series: [
      {
        name: 'Hybrid',
        data: []
      },
      {
        name: 'Bot',
        data: []
      },
      {
        name: 'Total',
        data: []
      }
    ],
    label: [],
    loading: true,
    failed: false
  };

  @Mutation
  SET_TICKET_STATUS_REPORT(data: TicketStatus): void {
    this.ticketStatus.total_closed = data.total_closed;
    this.ticketStatus.total_conversation = data.total_conversation;
    this.ticketStatus.total_open = data.total_open;
    this.ticketStatus.total_pending = data.total_pending;
    this.ticketStatus.total_ticket = data.total_ticket;
    this.ticketStatus.total_unassigned = data.total_unassigned;
  }

  @Mutation
  SET_TICKET_HANDLER_REPORT(data: TicketHandler[]): void {
    data.forEach((item, index) => {
      this.ticketHandler.series[0].data.push(item.response_agent);
      this.ticketHandler.series[1].data.push(item.response_bot);
      this.ticketHandler.series[2].data.push(item.total_ticket);
      this.ticketHandler.label.push(item.start_time);
      if (index === 3) {
        this.ticketHandler.loading = true;
      }
    });
  }

  @Mutation
  RESET_TICKET_STATUS_REPORT(): void {
    this.ticketStatus.total_closed = -1;
    this.ticketStatus.total_conversation = -1;
    this.ticketStatus.total_open = -1;
    this.ticketStatus.total_pending = -1;
    this.ticketStatus.total_ticket = -1;
    this.ticketStatus.total_unassigned = -1;
  }

  @Action
  async GET_TICKET_STATUS_REPORT(): Promise<ResponseType> {
    return await api.summary.getTicketStatusReport();
  }

  @Action
  async GET_TICKET_HANDLER_REPORT(): Promise<ResponseType> {
    return await api.summary.getTicketHandlerReport();
  }

  get ticket_status(): TicketStatus {
    return this.ticketStatus;
  }

  get ticket_handler(): any {
    // return this.ticketHandler.data;
    return this.ticketHandler;
  }
}
