import type { Ticket } from "../../../types/Ticket";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: Ticket["status"];
}

const statusClass = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  CLOSED: "closed",
};

const statusLabel = {
  IN_PROGRESS: "Em Andamento",
  OPEN: "Aberto",
  CLOSED: "Fechado",
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${statusClass[status]}`}>
      {statusLabel[status] || status}
    </span>
  );
}

export default StatusBadge;