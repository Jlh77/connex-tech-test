import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { col, fn } from 'sequelize';
import { Interaction } from '../models/Interaction';
import { Agent } from '../models/Agent';

export const GET: Operation = async (req: Request, res: Response) => {
  const day = fn('date', col('created_at'));

  const report = await Interaction.findAll({
    attributes: [
      [day, 'date'],
      'agent_id',
      [col('Agent.name'), 'agent_name'],
      [fn('count', col('Interaction.id')), 'total_interactions'],
      [fn('round', fn('avg', col('length_seconds'))), 'average_length_seconds'],
    ],
    // Inner join: interactions without a matching agent can't be attributed
    include: [{ model: Agent, attributes: [], required: true }],
    group: [day, 'Interaction.agent_id'],
    order: [
      [day, 'DESC'],
      [col('Agent.name'), 'ASC'],
    ],
    raw: true,
  });

  return res.send({ data: report });
};

GET.apiDoc = {
  description: 'Get a summary of interactions per agent, per day.',
  operationId: 'getAgentDailyReport',
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
                    // null when created_at can't be parsed as a date
                    date: {
                      type: 'string',
                      nullable: true,
                      format: 'date',
                    },
                    agent_id: {
                      type: 'number',
                    },
                    agent_name: {
                      type: 'string',
                    },
                    total_interactions: {
                      type: 'number',
                    },
                    // null when every interaction in the group has no length
                    average_length_seconds: {
                      type: 'number',
                      nullable: true,
                    },
                  },
                  required: [
                    'date',
                    'agent_id',
                    'agent_name',
                    'total_interactions',
                    'average_length_seconds',
                  ],
                  type: 'object',
                },
              },
            },
            required: ['data'],
            type: 'object',
          },
        },
      },
      description: 'Agent daily report',
    },
  },
};
