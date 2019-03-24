import { PhoneFormatPipe } from './phone-format.pipe';

describe('PhoneFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms 0000000000 to 000 000 00 00', () => {
    const pipe = new PhoneFormatPipe();
    expect(pipe.transform('0000000000')).toBe('000 000 00 00');
  });

  it('transforms 00000 00000 to 000 000 00 00', () => {
    const pipe = new PhoneFormatPipe();
    expect(pipe.transform('00000 00000')).toBe('000 000 00 00');
  });

  it('transforms 000 0000 000 to 000 000 00 00', () => {
    const pipe = new PhoneFormatPipe();
    expect(pipe.transform('000 0000 000')).toBe('000 000 00 00');
  });
});
