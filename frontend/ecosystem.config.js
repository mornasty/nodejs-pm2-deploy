const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.deploy') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_KEY, DEPLOY_WWW_PATH
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: DEPLOY_KEY,
      'post-deploy': [
        'cd ../source/frontend',
        'npm install',
        'npm run build',
        `sudo cp -r ./build ${DEPLOY_WWW_PATH}`
      ].join(' && '),
    },
  },
};
