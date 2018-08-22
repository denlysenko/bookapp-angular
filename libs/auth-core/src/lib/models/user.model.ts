export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  roles?: string[];
  reading?: Reading;
}

export interface Reading {
  epubUrl: string;
  bookmark: string;
}

export interface UserSelfResponse {
  me: User;
}
