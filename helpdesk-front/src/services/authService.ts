import api from "./api";

interface LoginResponse {
  token: string;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    "/auth/login",
    {
      username,
      password,
    }
  );

  return response.data;
}