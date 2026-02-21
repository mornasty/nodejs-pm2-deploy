const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.deploy') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_KEY,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: DEPLOY_KEY,
      'pre-deploy-local': `scp -i ${DEPLOY_KEY} ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/backend.env`,
      'post-deploy': [
        `cd ${DEPLOY_PATH}/current/backend`,
        'cp ../../shared/backend.env .env',
        'npm install',
        'npm run build',
        'pm2 startOrRestart ./ecosystem.config.js --env production',
      ].join(' && '),
    },
  },
};
