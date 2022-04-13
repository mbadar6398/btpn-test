export interface InputFlow {
  name: string;
  description: string;
  response: string;
  response_type: string;
  use_condition: boolean;
  use_profiling: boolean;
  use_reminder: boolean;
  use_scheduler: boolean;
  use_expiry: boolean;
  conditions: object[];
}
