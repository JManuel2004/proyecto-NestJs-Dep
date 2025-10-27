export interface Jwt {
  id: string;
  email: string;
  role: 'superadmin' | 'usuario';
}
