interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
export type { AuthResponse };
