export interface Appointment {
    id?: number;
    patient?: any;
    dentist?: any;
    user?: any;
    description?: string;
    cancellationReason?: string;
    startTime?: string;
    endTime?: string;
    bookedAt?: string;
    status?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
