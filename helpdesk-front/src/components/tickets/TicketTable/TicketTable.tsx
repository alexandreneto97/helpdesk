import type { Ticket } from "../../../types/Ticket";

import PriorityBadge from "../PriorityBadge/PriorityBadge";
import StatusBadge from "../StatusBadge/StatusBadge";

import { Pencil, Trash2, Plus, FileText } from "lucide-react";

import "./TicketTable.css";

interface TicketTableProps {
  titulo: string;
  tickets: Ticket[];
  isAdmin: boolean;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
  onView: (ticket: Ticket) => void;
}

function TicketTable({
  titulo,
  tickets,
  isAdmin,
  onEdit,
  onDelete,
  onCreate,
  onView,
}: TicketTableProps) {
  return (
    <section className="ticket-section">
      <div className="ticket-header">
        <div className="ticket-title-heading">
          <FileText size={27} strokeWidth={2} />

          <h2>{titulo}</h2>
        </div>

        <div className="ticket-header-actions">
          <span className="ticket-count">
            {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}
          </span>

          {isAdmin && (
            <button
              type="button"
              className="create-ticket-button"
              onClick={onCreate}
            >
              <Plus size={17} strokeWidth={2.2} />
              Novo Ticket
            </button>
          )}
        </div>
      </div>

      <div className="table-container">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Responsável</th>
              <th>Criado em</th>

              {isAdmin && <th>Ações</th>}
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="ticket-row"
                onClick={() => onView(ticket)}
                title="Clique para visualizar o ticket"
              >
                <td className="ticket-id">#{ticket.id}</td>

                <td className="ticket-title">{ticket.title}</td>

                <td className="ticket-description">{ticket.description}</td>

                <td>
                  <StatusBadge status={ticket.status} />
                </td>

                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>

                <td className="ticket-responsible">{ticket.responsible}</td>

                <td className="ticket-created-at">
                  {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                </td>

                {isAdmin && (
                  <td>
                    <div className="ticket-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(ticket);
                        }}
                        title="Editar ticket"
                        aria-label={`Editar ticket ${ticket.id}`}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(ticket.id);
                        }}
                        title="Excluir ticket"
                        aria-label={`Excluir ticket ${ticket.id}`}
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <div className="empty-tickets">
            <h3>Nenhum ticket encontrado</h3>

            <p>Não existem tickets para os filtros selecionados.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TicketTable;
