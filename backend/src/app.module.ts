import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoController } from "./controllers/todo.controller";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [],
  controllers: [AppController, TodoController, AuthController],
  providers: [AppService],
})
export class AppModule {}
