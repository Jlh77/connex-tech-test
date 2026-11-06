import type { Express } from 'express';
import { initialize } from 'express-openapi';
import path from 'path';

const routesPath = path.resolve(__dirname, '..', 'paths');
// '.ts' when running from source in dev (tsx), '.js' when running the build
const ext = path.extname(__filename);

export const expressOpenApi = async (app: Express) => {
  return await initialize({
    apiDoc: {
      info: {
        title: 'ConnexAI Tech Test API',
        version: '0.0.1',
      },
      openapi: '3.1.0',
      paths: {},
    },
    app,
    promiseMode: true,
    paths: routesPath,
    routesGlob: `**/!(*.test|*.spec)${ext}`,
    routesIndexFileRegExp: new RegExp(`(?:index)?\\${ext}$`),
  });
};
