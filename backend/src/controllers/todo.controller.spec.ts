import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "./todo.controller";

describe("TodoController", () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of todos", async () => {
      const result = { items: [] };
      jest.spyOn(controller, "getAll").mockImplementation(async () => result);
      expect(await controller.getAll("userId")).toBe(result);
    });
  });

  describe("create", () => {
    test.todo("should return a todo");
  });
});
