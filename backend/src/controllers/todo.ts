import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import client from "@utils/prismaClient";
import { Request } from "express";

@Controller("todo")
export class TodoController {
  @Get()
  // @UseGuards(AuthGuard)
  async getAll() {
    const todos = await client.todo.findMany();
    return todos;
  }

  @Post()
  // @UseGuards(AuthGuard)
  async create(@Body("title") title: string) {
    const todo = await client.todo.create({
      data: {
        title,
      },
    });
    return todo;
  }
}
