import { ApiProperty } from "@nestjs/swagger";

export class Todo {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  userId: string;
}
