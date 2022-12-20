import { ClientInterface } from 'src/clients/domain/client.interface';

export interface VisitInterface {
  id: string;
  date: Date;
  client: ClientInterface;
}
