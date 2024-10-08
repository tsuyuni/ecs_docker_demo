import { AllowUserGuard } from "./allowUser";

describe("AllowUserGuard", () => {
  it("should be defined", () => {
    expect(new AllowUserGuard()).toBeDefined();
  });
});
