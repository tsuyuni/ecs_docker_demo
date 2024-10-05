import { AllowUserAuthGuard } from "./allowUser";

describe("AllowUserAuthGuard", () => {
  it("should be defined", () => {
    expect(new AllowUserAuthGuard()).toBeDefined();
  });
});
