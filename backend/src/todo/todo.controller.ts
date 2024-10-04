import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "@auth/private/auth.guard";
import client from "@utils/prismaClient";

@Controller("todo")
export class TodoController {
  @Get()
  // @UseGuards(AuthGuard)
  async getTodos(@Req() req: Request) {
    console.log("here");
    const todos = await client.todo.findMany();
    return todos;
  }
}
