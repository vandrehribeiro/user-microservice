module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'campanhaanimal',
  //entities: [__dirname + '/../../dist/modules/**/entities/*.entity.js'],
  //entities: [__dirname + '/../../**/*.entity.js'],
  //entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
