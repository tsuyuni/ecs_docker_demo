import { AuthGuard } from "@auth/private";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import client from "@utils/prismaClient";
import { Request } from "express";
import { UserData } from "src/decorators/userData";

@Controller("todo")
export class TodoController {
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Req() req: Request, @UserData("sub") userId: string) {
    const todos = await client.todo.findMany({
      where: {
        userId,
      },
    });
    return todos;
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body("title") title: string, @UserData("sub") userId: string) {
    console.log(title, userId);
    const todo = await client.todo.create({
      data: {
        title,
        userId,
      },
    });
    return todo;
  }
}
