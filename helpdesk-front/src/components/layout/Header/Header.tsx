import { Headphones, LogOut, User } from "lucide-react";

import "./Header.css";

interface HeaderProps {
  username: string | null;
  role: string | null;
  onLogout: () => void;
}

function Header({
  username,
  role,
  onLogout,
}: HeaderProps) {

  const roleLabel =
    role === "ROLE_ADMIN"
      ? "Administrador"
      : "Usuário";

  return (
    <header className="app-header">

      <div className="header-content">

        <div className="header-brand">

          <div className="header-brand-logo">

            <div className="header-logo-icon">
              <Headphones
                size={22}
                strokeWidth={2}
              />
            </div>

            <h1>
              <span className="logo-help">Help</span>
              <span className="logo-desk">Desk</span>
            </h1>

          </div>

          <p>
            Sistema de gerenciamento de chamados
          </p>

        </div>

        <div className="header-user">

          <div className="header-user-info">

            <div className="header-user-icon">
              <User
                size={17}
                strokeWidth={2}
              />
            </div>

            <div className="header-user-details">

              <span className="header-username">
                {username}
              </span>

              <span className="header-role">
                {roleLabel}
              </span>

            </div>

          </div>

          <button
            type="button"
            className="header-logout-button"
            onClick={onLogout}
            title="Sair"
          >
            <LogOut
              size={16}
              strokeWidth={2}
            />

            <span>Sair</span>
          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;