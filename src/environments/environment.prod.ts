import { CONTENTFUL_ACCESS_TOKEN } from './secrets';

export const environment = {
  production: true,
  contentful: {
    spaceId: '${CONTENTFUL_SPACE_ID}',
    accessToken: '${CONTENTFUL_ACCESS_TOKEN}',
  },
  hostUrl: 'https://www.carlosesantos.com',
};
