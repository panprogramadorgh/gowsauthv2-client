export interface User {
  userID: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface MainCTXData {
  user: User
}