import api from "./api";
import type { Ticket } from "../types/Ticket";

export type TicketFormData = Omit<
  Ticket,
  "id" | "createdAt"
>;

interface TicketResponse {
  content: Ticket[];
}

export async function getTickets(
  status?: string,
  priority?: string,
): Promise<Ticket[]> {

  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (priority) {
    params.append("priority", priority);
  }

  const response = await api.get<TicketResponse>(
    "/tickets",
    {
      params,
    }
  );

  return response.data.content;
}

export async function createTicket(
  ticket: TicketFormData,
): Promise<Ticket> {

  const response = await api.post<Ticket>(
    "/tickets",
    ticket
  );

  return response.data;
}

export async function updateTicket(
  id: number,
  ticket: TicketFormData,
): Promise<Ticket> {

  const response = await api.put<Ticket>(
    `/tickets/${id}`,
    ticket
  );

  return response.data;
}

export async function deleteTicket(
  id: number
): Promise<void> {

  await api.delete(`/tickets/${id}`);
}