export interface LoginBody {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type User = {
  id: number;
  fullname: string;
  username: string;
};
