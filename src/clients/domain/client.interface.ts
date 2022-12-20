import { VisitInterface } from 'src/visits/domain/visit.interface';

export interface ClientInterface {
  id: string;
  name: string;
  surename: string;
  documentNumber: string;
  email: string;
  dateOfBirth: Date;
  phone?: string;
  visits: VisitInterface[];
}
