module.exports = {
  apps: [
    {
      script: 'main.js',
      watch: '.',
    },
    {
      script: './service-worker/',
      env: {
        NODE_ENV: 'prod',
        PORT: 8080,
        DB_HOST: 'remotemysql.com',
        DB_USER: 'lPYiVMDBC6',
        DB_PASSWORD: 'nIaK6eUTJz',
        DB_NAME: 'lPYiVMDBC6',
        DB_PORT: 3306,
        SECRET_KEY: 'secret_key_aleksey',
        PRIVATE_KEY: 'secret_key_aleksey',
        originPort: 'http://localhost:3000',
        MAIL_HOST: 'gmail',
        MAIL_USER: 'dev.holovashchenko@gmail.com',
        MAIL_PASSWORD: 'full-stack',
        MAIL_FROM: 'dev.holovashchenko@gmail.com',
      },
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
