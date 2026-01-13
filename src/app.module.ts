import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HeroModule } from './hero/hero.module';
import DBConfig from './mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(DBConfig),
    HeroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
