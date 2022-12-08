import { DataSource } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Hash } from './entities/hash.entity';

export const hashProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'HASH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hash),
    inject: ['DATA_SOURCE'],
  }  
];
