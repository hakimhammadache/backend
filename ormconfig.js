module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'surpoids',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};
