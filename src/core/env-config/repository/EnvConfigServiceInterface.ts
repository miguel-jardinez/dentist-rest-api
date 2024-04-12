export interface EnvConfigServiceInterface {
  getString: (variable: string) => string;
  getNumber: (variable: string) => number;
  getBoolean: (variable: string) => boolean;
}
