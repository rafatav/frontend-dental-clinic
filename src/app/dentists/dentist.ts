export class Dentist {
    id?: number;
    name?: string;
    cpf?: string;
    email?: string;
    cro?: string;
    createdAt?: string;
    active?: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
