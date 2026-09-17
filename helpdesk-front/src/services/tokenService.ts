export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function removeToken(): void {
  localStorage.removeItem("token");
}

interface TokenPayload {
  sub: string;
  role: string;
}

function getTokenPayload(): TokenPayload | null {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = JSON.parse(
      atob(base64)
    );

    return decodedPayload;

  } catch {
    return null;
  }
}

export function getUsername(): string | null {
  const payload = getTokenPayload();

  return payload?.sub ?? null;
}

export function getUserRole(): string | null {
  const payload = getTokenPayload();

  return payload?.role ?? null;
}