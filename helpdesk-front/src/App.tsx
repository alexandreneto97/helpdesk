import { useEffect, useState } from "react";

import Header from "./components/layout/Header/Header";

import TicketTable from "./components/tickets/TicketTable/TicketTable";

import TicketFilter from "./components/tickets/TicketFilter/TicketFilter";

import TicketForm from "./components/tickets/TicketForm/TicketForm";

import DeleteTicketModal from "./components/tickets/DeleteTicketModal/DeleteTicketModal";

import TicketViewModal from "./components/tickets/TicketViewModal/TicketViewModal";

import Login from "./components/Login/login";

import type { Ticket } from "./types/Ticket";

import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./services/ticketService";

import {
  getToken,
  removeToken,
  getUsername,
  getUserRole,
} from "./services/tokenService";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken());

  const [userRole, setUserRole] = useState<string | null>(() => getUserRole());

  const [username, setUsername] = useState<string | null>(() => getUsername());

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [statusFilter, setStatusFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const [creatingTicket, setCreatingTicket] = useState(false);

  const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null);

  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchTickets = async () => {
      try {
        const data = await getTickets(statusFilter, priorityFilter);

        setTickets(data);
      } catch (error) {
        console.error("Erro ao buscar os tickets:", error);
      }
    };

    fetchTickets();
  }, [isAuthenticated, statusFilter, priorityFilter]);

  const handleCreateTicket = async (
    newTicket: Omit<Ticket, "id" | "createdAt">,
  ) => {
    try {
      const data = await createTicket(newTicket);

      setTickets((currentTickets) => [...currentTickets, data]);

      setCreatingTicket(false);
    } catch (error) {
      console.error("Erro ao criar o ticket:", error);
    }
  };

  const handleUpdateTicket = async (
    updatedTicket: Omit<Ticket, "id" | "createdAt">,
  ) => {
    if (!editingTicket) {
      return;
    }

    try {
      const data = await updateTicket(editingTicket.id, updatedTicket);

      setTickets((currentTickets) =>
        currentTickets.map((ticket) => (ticket.id === data.id ? data : ticket)),
      );

      setEditingTicket(null);
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
    }
  };

  const handleDeleteTicket = async () => {
    if (!deletingTicket) {
      return;
    }

    try {
      await deleteTicket(deletingTicket.id);

      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket.id !== deletingTicket.id),
      );

      setDeletingTicket(null);
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
    }
  };

  const handleRequestDelete = (id: number) => {
    const ticket = tickets.find((ticket) => ticket.id === id);

    if (ticket) {
      setDeletingTicket(ticket);
    }
  };

  const handleLogin = () => {
    setUsername(getUsername());
    setUserRole(getUserRole());
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    removeToken();
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const isAdmin = userRole === "ROLE_ADMIN";

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header username={username} role={userRole} onLogout={handleLogout} />

    

      <TicketFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <TicketTable
        titulo="Tickets"
        tickets={tickets}
        onEdit={setEditingTicket}
        onView={setViewingTicket}
        onDelete={handleRequestDelete}
        onCreate={() => setCreatingTicket(true)}
        isAdmin={isAdmin}
      />

      {deletingTicket && (
        <DeleteTicketModal
          ticket={deletingTicket}
          onCancel={() => setDeletingTicket(null)}
          onConfirm={handleDeleteTicket}
        />
      )}

      {viewingTicket && (
        <TicketViewModal
          ticket={viewingTicket}
          onClose={() => setViewingTicket(null)}
        />
      )}

      {editingTicket && (
        <TicketForm
          ticket={editingTicket}
          onSave={handleUpdateTicket}
          onCancel={() => setEditingTicket(null)}
        />
      )}

      {creatingTicket && (
        <TicketForm
          onSave={handleCreateTicket}
          onCancel={() => setCreatingTicket(false)}
        />
      )}
    </div>
  );
}

export default App;
