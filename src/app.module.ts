import { Module } from '@nestjs/common';
import {PuzzleModule} from "./puzzle/puzzle.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../src/util/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // synchronize: true,
      timezone: 'UTC',
      charset: 'utf8mb4',
    }),
    PuzzleModule],
})
export class AppModule {}