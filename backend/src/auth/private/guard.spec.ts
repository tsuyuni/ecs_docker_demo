import { AuthGuard } from "./guard";

describe("AuthGuard", () => {
  it("should be defined", () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
