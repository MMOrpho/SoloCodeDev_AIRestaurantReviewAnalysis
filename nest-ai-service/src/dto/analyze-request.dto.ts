import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class AnalyzeRequestDto {
  @IsString({ message: 'The prompt override must be valid text.' })
  @IsNotEmpty({ message: 'The analysis prompt cannot be empty.' })
  @MinLength(10, { message: 'Please provide a prompt explanation of at least 10 characters.' })
  @MaxLength(500, { message: 'Keep custom prompt overrides under 500 characters.' })
  customPromptOverride!: string;
}