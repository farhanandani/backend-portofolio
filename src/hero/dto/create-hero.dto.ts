import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @MaxLength(35, { message: 'Header one must be less than 35 characters' })
  @IsNotEmpty({ message: 'Header one is required' })
  headerOne: string;

  @IsString()
  @MaxLength(30, { message: 'Header two must be less than 30 characters' })
  @IsNotEmpty({ message: 'Header two is required' })
  headerTwo: string;

  @IsString()
  @MaxLength(150, { message: 'Description must be less than 150 characters' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
