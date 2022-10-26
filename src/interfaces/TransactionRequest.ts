import { Request } from 'express';
export interface TransactionRequest extends Request {
  query: {
    type: string;
    search: string;
    limit?: string;
    offset?: string;
  };
}
