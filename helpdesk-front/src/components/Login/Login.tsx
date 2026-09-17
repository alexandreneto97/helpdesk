import { useState, type SubmitEvent } from "react";
import { LockKeyhole, User } from "lucide-react";
import { login } from "../../services/authService";
import { saveToken } from "../../services/tokenService";
import "./Login.css";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(username, password);

      saveToken(response.token);

      onLogin();
    } catch {
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">
            <LockKeyhole size={24} />
          </div>

          <h1>HelpDesk</h1>

          <p>
            Entre na sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="login-field">
            <label htmlFor="username">
              Usuário
            </label>

            <div className="login-input-wrapper">
              <User size={18} />

              <input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">
              Senha
            </label>

            <div className="login-input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </div>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;