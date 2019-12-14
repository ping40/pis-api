import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly password: string;
}
