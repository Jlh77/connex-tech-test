import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { Customer } from '../models/Customer';

export const GET: Operation = async (req: Request, res: Response) => {
  const customers = await Customer.findAll();

  return res.send({ data: customers });
};

GET.apiDoc = {
  description: 'Get all customer records.',
  operationId: 'getCustomers',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            properties: {
              data: {
                type: 'array',
                items: {
                  properties: {
                    id: {
                      type: 'number',
                    },
                    name: {
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
              },
            },
            required: ['data'],
            type: 'object',
          },
        },
      },
      description: 'Customers',
    },
  },
};
