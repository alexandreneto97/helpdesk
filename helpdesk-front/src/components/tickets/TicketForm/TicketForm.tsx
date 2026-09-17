import { useEffect, useState, type SubmitEvent } from "react";

import "./TicketForm.css";

import type { Ticket } from "../../../types/Ticket";

type TicketFormData = Omit<Ticket, "id" | "createdAt">;

interface TicketFormProps {
  ticket?: Ticket;
  onSave: (ticket: TicketFormData) => void | Promise<void>;
  onCancel: () => void;
}

function TicketForm({
  ticket,
  onSave,
  onCancel,
}: TicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Ticket["status"]>("OPEN");
  const [priority, setPriority] = useState<Ticket["priority"]>("LOW");
  const [responsible, setResponsible] = useState("");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setResponsible(ticket.responsible);
    } else {
      setTitle("");
      setDescription("");
      setStatus("OPEN");
      setPriority("LOW");
      setResponsible("");
    }
  }, [ticket]);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    await onSave({
      title,
      description,
      status,
      priority,
      responsible,
    });
  };

  return (
    <div className="ticket-form-overlay">
      <div className="ticket-form-container">

        <div className="ticket-form-header">
          <div>
            <h2>
              {ticket ? "Editar Ticket" : "Criar Ticket"}
            </h2>

            <p>
              {ticket
                ? "Atualize as informações do ticket."
                : "Preencha as informações para criar um novo ticket."}
            </p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Fechar formulário"
            title="Fechar"
          >
            ×
          </button>
        </div>

        <form
          className="ticket-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">
            Título
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do ticket"
            required
          />

          <label htmlFor="description">
            Descrição
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o problema ou solicitação"
            required
          />

          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as Ticket["status"],
              )
            }
          >
            <option value="OPEN">
              Aberto
            </option>

            <option value="IN_PROGRESS">
              Em andamento
            </option>

            <option value="CLOSED">
              Fechado
            </option>
          </select>

          <label htmlFor="priority">
            Prioridade
          </label>

          <select
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as Ticket["priority"],
              )
            }
          >
            <option value="LOW">
              Baixa
            </option>

            <option value="MEDIUM">
              Média
            </option>

            <option value="HIGH">
              Alta
            </option>

            <option value="CRITICAL">
              Crítica
            </option>
          </select>

          <label htmlFor="responsible">
            Responsável
          </label>

          <input
            id="responsible"
            type="text"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            placeholder="Digite o responsável pelo ticket"
            required
          />

          <div className="ticket-form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="save-button"
            >
              {ticket
                ? "Salvar alterações"
                : "Criar ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketForm;