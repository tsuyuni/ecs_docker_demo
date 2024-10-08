import { AuthGuard } from "@auth/private";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import client from "@utils/prismaClient";
import { UserData } from "@decorators/userData";
import {
  CreateTodoRequest,
  CreateTodoResponse,
  GetTodosResponse,
} from "@dto/todo.dto";
import { AllowUserGuard } from "@auth/allowUser";

@Controller("todo")
export class TodoController {
  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetTodosResponse })
  async getAll(@UserData("sub") userId: string): Promise<GetTodosResponse> {
    const todos = await client.todo.findMany({
      where: {
        userId,
      },
    });

    return {
      items: todos,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateTodoResponse })
  async create(
    @Body() { title }: CreateTodoRequest,
    @UserData("sub") userId: string
  ): Promise<CreateTodoResponse> {
    const todo = await client.todo.create({
      data: {
        title,
        userId,
      },
    });

    return {
      item: todo,
    };
  }
}
