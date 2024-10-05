export declare class TodoController {
    getAll(): Promise<{
        id: string;
        title: string;
    }[]>;
    create(title: string): Promise<{
        id: string;
        title: string;
    }>;
}
