import { secrets } from './secrets';

export const environment = {
  production: false,
  contentful: secrets.contentful,
  hostUrl: 'https://localhost:4200/',
};
