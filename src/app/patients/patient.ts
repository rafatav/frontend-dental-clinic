export class Patient {
    id?: number;
    name?: string;
    email?: string;
    cpf?: string;
    createdAt?: string;
    phoneNumber?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
