import { AllowUserAuthGuard } from './allow-user-auth.guard';

describe('AllowUserAuthGuard', () => {
  it('should be defined', () => {
    expect(new AllowUserAuthGuard()).toBeDefined();
  });
});
