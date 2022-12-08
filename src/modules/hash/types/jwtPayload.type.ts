export type JwtPayload = {
  user_id: string;
  sub: string;
  role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';
};

