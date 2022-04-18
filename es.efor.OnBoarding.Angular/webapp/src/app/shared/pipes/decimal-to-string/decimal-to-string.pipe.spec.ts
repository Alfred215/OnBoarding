import { DecimalToStringPipe } from './decimal-to-string.pipe';

describe('DecimalToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DecimalToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
