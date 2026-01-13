import { PartialType } from '@nestjs/swagger';
import { CreateHeroDto } from './create-hero.dto';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  @IsString()
  @MaxLength(35, { message: 'Header one must be less than 35 characters' })
  @IsOptional()
  headerOne: string;

  @IsString()
  @MaxLength(30, { message: 'Header two must be less than 30 characters' })
  @IsOptional()
  headerTwo: string;

  @IsString()
  @MaxLength(150, { message: 'Description must be less than 150 characters' })
  @IsOptional()
  description: string;
}
