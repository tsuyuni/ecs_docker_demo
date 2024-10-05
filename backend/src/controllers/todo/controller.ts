import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@auth/private/guard";
import client from "@utils/prismaClient";

@Controller("todo")
export class TodoController {
  @Get()
  // @UseGuards(AuthGuard)
  async getTodos() {
    const todos = await client.todo.findMany();
    return todos;
  }
}
