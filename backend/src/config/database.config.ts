import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbPath = configService.get<string>('DB_PATH', 'diary.db');
  // Resolve DB path relative to backend directory
  const resolvedDbPath = dbPath.startsWith('/') || dbPath.match(/^[A-Z]:/) 
    ? dbPath 
    : resolve(__dirname, '../../', dbPath);

  return {
    type: 'sqlite',
    database: resolvedDbPath,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  };
};

