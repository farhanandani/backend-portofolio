import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Hero])],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
