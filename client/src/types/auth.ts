export interface LoginBody {
  username: string;
  password: string;
}

export type User = {
  id: number;
  fullname: string;
  username: string;
};
