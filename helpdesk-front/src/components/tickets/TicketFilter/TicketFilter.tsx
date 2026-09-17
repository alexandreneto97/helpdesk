import type { Dispatch, SetStateAction } from "react";
import "./TicketFilter.css";

interface TicketFilterProps {
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  priorityFilter: string;
  setPriorityFilter: Dispatch<SetStateAction<string>>;

}

function TicketFilter({ statusFilter, setStatusFilter, priorityFilter, setPriorityFilter }: TicketFilterProps) {
  return (
    <div className="ticket-filters">
      <label htmlFor="statusFilter">Status:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="OPEN">Aberto</option>
        <option value="IN_PROGRESS">Em andamento</option>
        <option value="CLOSED">Fechado</option>
      </select>

      <label htmlFor="priorityFilter">Prioridade:</label>
      <select
        id="priorityFilter"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="">Todas</option>
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
        <option value="CRITICAL">Crítica</option>
      </select>
    </div>
  );
}

export default TicketFilter;
