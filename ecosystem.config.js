module.exports = {
    apps: [{
      name: 'cv',
      script: 'dist/cv/server/server.mjs',
      env: {
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }]
  };