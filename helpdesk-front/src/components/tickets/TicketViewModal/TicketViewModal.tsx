import type { Ticket } from "../../../types/Ticket";

import StatusBadge from "../StatusBadge/StatusBadge";
import PriorityBadge from "../PriorityBadge/PriorityBadge";

import { X } from "lucide-react";

import "./TicketViewModal.css";

interface TicketViewModalProps {
  ticket: Ticket;
  onClose: () => void;
}

function TicketViewModal({
  ticket,
  onClose,
}: TicketViewModalProps) {
  const formattedDate = new Date(ticket.createdAt).toLocaleString(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  );

  return (
    <div
      className="ticket-view-overlay"
      onClick={onClose}
    >
      <div
        className="ticket-view-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ticket-view-header">
          <div>
            <span className="ticket-view-id">
              Ticket #{ticket.id}
            </span>

            <h2>{ticket.title}</h2>
          </div>

          <button
            type="button"
            className="ticket-view-close"
            onClick={onClose}
            aria-label="Fechar"
            title="Fechar"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="ticket-view-content">
          <div className="ticket-view-field">
            <span className="ticket-view-label">
              Descrição
            </span>

            <div className="ticket-view-description">
              {ticket.description ||
                "Nenhuma descrição informada."}
            </div>
          </div>

          <div className="ticket-view-details">
            <div className="ticket-view-field">
              <span className="ticket-view-label">
                Status
              </span>

              <StatusBadge status={ticket.status} />
            </div>

            <div className="ticket-view-field">
              <span className="ticket-view-label">
                Prioridade
              </span>

              <PriorityBadge priority={ticket.priority} />
            </div>

            <div className="ticket-view-field">
              <span className="ticket-view-label">
                Responsável
              </span>

              <span className="ticket-view-value">
                {ticket.responsible || "Não informado"}
              </span>
            </div>

            <div className="ticket-view-field">
              <span className="ticket-view-label">
                Criado em
              </span>

              <span className="ticket-view-value">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="ticket-view-footer">
          <button
            type="button"
            className="ticket-view-close-button"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketViewModal;