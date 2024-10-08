import { Todo } from "@models/todo.model";
import { ApiProperty } from "@nestjs/swagger";

export class GetTodosResponse {
  @ApiProperty({ type: [Todo] })
  items: Todo[];
}

export class CreateTodoRequest {
  @ApiProperty()
  title: string;
}

export class CreateTodoResponse {
  @ApiProperty({ type: Todo })
  item: Todo;
}
