import { CONTENTFUL_ACCESS_TOKEN } from './secrets';

export const environment = {
  production: true,
  contentful: {
    spaceId: '${CONTENTFUL_SPACE_ID}',
    token: '${CONTENTFUL_ACCESS_TOKEN}',
  },
  hostUrl: 'https://www.carlosesantos.com',
};
