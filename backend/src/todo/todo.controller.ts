import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import client from "src/utils/prismaClient";

@Controller("todo")
export class TodoController {
  // @Get()
  // getTodos() {
  //   const todos = client.todo.findMany();
  //   return todos;
  // }

  @Get()
  getTodos2(@Req() request: Request) {
    return request.headers;
  }
}
