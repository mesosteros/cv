module.exports = {
    apps: [
      {
        name: 'cv',
        script: 'dist/cv/server/server.mjs',
        instances: '1',
        exec_mode: 'cluster',
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };