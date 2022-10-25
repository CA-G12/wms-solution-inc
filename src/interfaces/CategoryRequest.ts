import { Request } from 'express';

export interface CategoryRequest extends Request {
  params: {
    id: string;
  };

  body: {
    name: string;
    limit?: number;
    offset?: number;
    search?: string;
  };
}
