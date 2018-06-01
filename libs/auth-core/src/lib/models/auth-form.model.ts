export interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthForm {
  credentials: Credentials;
  isLoggingIn: boolean;
}
