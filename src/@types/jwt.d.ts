import 'express';
type User = {
  sub: string;
  username: string;
  name: string;
  professionalId: string;
};
declare module 'express' {
  interface Request {
    user: User;
    refresh_token: string;
  }
}
