import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { locationCoords } from '../util/locationCoords';
import { coordsToTemp } from '../util/coordsToTemp';

export const GET: Operation = async (req: Request, res: Response) => {
  const result = await Promise.all(
    Object.keys(locationCoords).map(async (key) => {
      const coords = locationCoords[key];

      try {
        const temp = await coordsToTemp(coords.lat, coords.long);
        return { location: coords.name, temp };
      } catch (error) {
        console.error(`Failed to fetch weather for ${coords.name}:`, error);
        return { location: coords.name, temp: null };
      }
    })
  );

  return res.send({ data: result });
};

GET.apiDoc = {
  description: 'Get weather for locations.',
  operationId: 'getWeather',
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
                    location: {
                      type: 'string',
                    },
                    // null when the temperature couldn't be fetched
                    temp: {
                      type: 'number',
                      nullable: true,
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
      description: 'Weather',
    },
  },
};
