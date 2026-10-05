export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}