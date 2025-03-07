import { CONTENTFUL_ACCESS_TOKEN } from './secrets';

export const environment = {
  production: true,
  contentful: {
    spaceId: '1hnpyxq3n4t6',
    token: CONTENTFUL_ACCESS_TOKEN,
  },
  hostUrl: 'https://carlosesantos.com/',
};
