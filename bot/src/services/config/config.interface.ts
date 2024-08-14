export interface ConfigServiceI {
  get(key: string): string;
  set(key: string, value: string): void;
}
