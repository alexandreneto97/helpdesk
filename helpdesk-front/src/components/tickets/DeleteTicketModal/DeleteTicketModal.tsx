import type { Ticket } from "../../../types/Ticket";
import "./DeleteTicketModal.css";

interface DeleteTicketModalProps {
  ticket: Ticket;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteTicketModal({
  ticket,
  onConfirm,
  onCancel,
}: DeleteTicketModalProps) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        

        <h2>Excluir ticket?</h2>

        <p>
          Tem certeza que deseja excluir o ticket{" "}
          <strong>#{ticket.id}</strong>?
          <br />
          Essa ação não poderá ser desfeita.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-cancel-button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="delete-confirm-button"
            onClick={onConfirm}
          >
            Excluir ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTicketModal;