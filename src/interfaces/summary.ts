export interface TicketStatus {
  total_bot: number;
  total_closed: number;
  total_conversation: number;
  total_open: number;
  total_pending: number;
  total_ticket: number;
  total_unassigned: number;
}
export interface TicketHandler {
  response_agent: number;
  response_bot: number;
  start_time: string;
  total_ticket: number;
}
