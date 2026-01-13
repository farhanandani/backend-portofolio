import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.heroService.createHeroes(createHeroDto);
  }

  @Get()
  getHeroes(): Promise<Hero[]> {
    return this.heroService.getHeroes();
  }

  @Patch()
  updateHeroes(@Body() updateHeroDto: UpdateHeroDto): Promise<Hero> {
    return this.heroService.updateHeroes(updateHeroDto);
  }
}
