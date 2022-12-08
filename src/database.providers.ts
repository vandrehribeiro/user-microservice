import { DataSource } from 'typeorm';
import { CreateUserTable1639414527318 } from './database/migrations/1639414527318-CreateUserTable';
import { CreateUserTokens1640294911515 } from './database/migrations/1640294911515-CreateUserToken';
import { CreateAddressfk1641230821441 } from './database/migrations/1641230821441-CreateAddressfk';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost', // para rodar no linux(Docker) substituir por host: 'db', windows 'localhost'
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'campanhaanimal',
        entities: [`${__dirname}/modules/**/entities/*.{ts,js}`],
        synchronize: false,
      });
      
      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'campanhaanimal',
  entities: [`${__dirname}/modules/**/entities/*.{ts,js}`],
  synchronize: false,
  migrations: [
    CreateUserTable1639414527318,
    CreateUserTokens1640294911515,
    CreateAddressfk1641230821441
  ],
});
