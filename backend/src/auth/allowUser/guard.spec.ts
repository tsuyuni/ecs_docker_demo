import { AllowUserAuthGuard } from "./guard";

describe("AllowUserAuthGuard", () => {
  it("should be defined", () => {
    expect(new AllowUserAuthGuard()).toBeDefined();
  });
});
