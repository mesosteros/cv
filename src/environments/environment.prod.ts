import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from './secrets';

export const environment = {
  production: true,
  contentful: {
    spaceId: CONTENTFUL_SPACE_ID,
    token: CONTENTFUL_ACCESS_TOKEN,
  },
  hostUrl: 'https://www.carlosesantos.com',
};
