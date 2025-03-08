module.exports = {
    apps: [
      {
        name: 'cv',
        script: 'dist/cv/server/main.js',
        instances: '1',
        exec_mode: 'cluster',
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };