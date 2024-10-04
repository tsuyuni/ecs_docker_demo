import { Request } from "express";
export declare class TodoController {
    getTodos(req: Request): Promise<{
        id: string;
        title: string;
    }[]>;
}
