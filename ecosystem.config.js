module.exports = {
    apps: [
      {
        name: 'cv-ssr',
        script: 'dist/cv/server/server.mjs',
        instances: '1',
        exec_mode: 'cluster',
        env_production: {
          NODE_ENV: 'production',
          CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID, // Pass variables explicitly
          CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN,
        },
      },
    ],
  };