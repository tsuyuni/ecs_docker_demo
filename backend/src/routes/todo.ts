import client from "@utils/prismaClient";
import { publicProcedure, router } from "@utils/router";

export const userRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await client.todo.findMany();
    return users;
  }),
});
