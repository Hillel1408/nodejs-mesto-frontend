module.exports = {
  apps: [
    {
      name: "frontend",
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: "origin/main",
      repo: process.env.FRONTEND_REPO,
      path: process.env.DEPLOY_PATH + "/frontend",
      "post-deploy": `
        npm install &&
        npm run build &&
        pm2 startOrRestart ecosystem.frontend.config.js --env production
      `,
    },
  },
};
