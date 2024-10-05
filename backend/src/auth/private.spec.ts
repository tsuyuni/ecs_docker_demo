import { AuthGuard } from "./private";

describe("AuthGuard", () => {
  it("should be defined", () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
