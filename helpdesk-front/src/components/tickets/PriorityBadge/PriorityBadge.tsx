import type { Ticket } from "../../types/Ticket";
import "./PriorityBadge.css";

interface PriorityBadgeProps {
  priority: Ticket["priority"];
}

const priorityClass = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

const priorityLabel = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  CRITICAL: "Crítica",
};


function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`priority-badge ${priorityClass[priority]}`}>    
      {priorityLabel[priority]}
    </span>
  );
}

export default PriorityBadge;