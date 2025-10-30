export type Rol = {
  id: number;
  rol: string;
  title: string;
};

export interface RolesResponse {
  error: string | null;
  data: Rol[];
  count: number;
}

export type CreateRol = Omit<Rol, 'id'>;
