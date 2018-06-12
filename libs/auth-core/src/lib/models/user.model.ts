export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  roles: string[];
  reading: any;
}

export interface UserSelfResponse {
  me: User;
}
