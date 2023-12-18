"server only";
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  greet: publicProcedure.query(async () => {
    return "Hello, tRPC";
  }),
});

export type AppRouter = typeof appRouter;
