import * as bcrypt from 'bcrypt';

export class PasswordUserValue {
  static saltOrRounds = 10;
  static pattern = '';
  static min = 8;
  static max = 20;

  constructor(private value: string) {}

  async generate(): Promise<string> {
    return bcrypt.hashSync(this.value, PasswordUserValue.saltOrRounds);
  }

  async compare(hash: string): Promise<boolean> {
    return bcrypt.compareSync(this.value, hash);
  }

  getValue(): string {
    return this.value;
  }
}
