import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoController } from "./controllers/todo.controller";

@Module({
  imports: [],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
