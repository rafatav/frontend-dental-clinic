export interface Role {
    id?: number;
    authority?: string;
}

export class User {
    id?: number;
    name?: string;
    cpf?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    lastLogin?: string;
    active?: boolean;
    roles: Role[] = [];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
