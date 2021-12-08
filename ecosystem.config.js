module.exports = {
  apps: [
    {
      name: 'perfect_holiday_backend',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'prod',
        PORT: 8080,
        DB_HOST: 'remotemysql.com',
        DB_USER: 'lPYiVMDBC6',
        DB_NAME: 'lPYiVMDBC6',
        DB_PASSWORD: 'nIaK6eUTJz',
        DB_PORT: 3306,
        PRIVATE_KEY: 'secret_key_aleksey',
        originPort: 'https://perfect-holidays.netlify.app',
        MAIL_HOST: 'gmail',
        MAIL_USER: 'dev.holovashchenko@gmail.com',
        MAIL_PASSWORD: 'full-stack',
        MAIL_FROM: 'dev.holovashchenko@gmail.com',
      },
    },
  ],
};
