import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: EntityRepository<Hero>,
  ) {}

  async createHeroes(data: CreateHeroDto): Promise<Hero> {
    const hero = new Hero(data.headerOne, data.headerTwo, data.description);

    const existingHero = await this.heroRepository.findAll();

    if (existingHero.length > 0) {
      throw new BadRequestException('Hero already exists');
    }

    this.heroRepository.getEntityManager().persist(hero);
    await this.heroRepository.getEntityManager().flush();

    return hero;
  }

  async getHeroes(): Promise<Hero[]> {
    return this.heroRepository.findAll();
  }

  async updateHeroes(updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const heroes: Hero[] = await this.heroRepository.findAll();
    const hero: Hero | undefined = heroes[0];

    if (!hero) {
      throw new BadRequestException('You dont have any hero section');
    }

    if (
      updateHeroDto.headerOne === hero.headerOne ||
      updateHeroDto.headerTwo === hero.headerTwo ||
      updateHeroDto.description === hero.description
    ) {
      throw new BadRequestException('No changes made');
    }

    if (updateHeroDto.headerOne) {
      hero.headerOne = updateHeroDto.headerOne;
    }
    if (updateHeroDto.headerTwo) {
      hero.headerTwo = updateHeroDto.headerTwo;
    }
    if (updateHeroDto.description) {
      hero.description = updateHeroDto.description;
    }

    await this.heroRepository.getEntityManager().flush();

    return hero;
  }
}
