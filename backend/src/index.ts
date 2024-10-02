import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "@utils/router";

const appRouter = router({
  // ...
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(8000);
