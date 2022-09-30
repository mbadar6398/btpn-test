export interface UserInterface {
  id: string;
  token: string;
  jobrole: string;
  fullname: string;
  email: string;
}

export interface UserPayload {
  email: string;
  password: string;
}
