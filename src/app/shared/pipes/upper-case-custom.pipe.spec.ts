import { UpperCaseCustomPipe } from './upper-case-custom.pipe';

describe('UpperCaseCustomPipe', () => {
  it('create an instance', () => {
    const pipe = new UpperCaseCustomPipe();
    expect(pipe).toBeTruthy();
  });
});
