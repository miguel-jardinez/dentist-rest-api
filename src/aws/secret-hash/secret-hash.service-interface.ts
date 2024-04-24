export interface SecretHashServiceInterface {
  awsHashSecret: (email: string) => string;
}
