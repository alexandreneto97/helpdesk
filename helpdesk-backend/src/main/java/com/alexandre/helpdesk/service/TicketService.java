package com.alexandre.helpdesk.service;

import com.alexandre.helpdesk.dto.PageResponse;
import com.alexandre.helpdesk.dto.TicketRequest;
import com.alexandre.helpdesk.dto.TicketResponse;
import com.alexandre.helpdesk.entity.Ticket;
import com.alexandre.helpdesk.entity.TicketPriority;
import com.alexandre.helpdesk.entity.TicketStatus;
import com.alexandre.helpdesk.exception.ResourceNotFoundException;
import com.alexandre.helpdesk.repository.TicketRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public TicketResponse create(TicketRequest ticketRequest) {

        Ticket ticket = new Ticket();

        ticket.setTitle(ticketRequest.getTitle());
        ticket.setDescription(ticketRequest.getDescription());
        ticket.setStatus(ticketRequest.getStatus());
        ticket.setPriority(ticketRequest.getPriority());
        ticket.setResponsible(ticketRequest.getResponsible());
        ticket.setCreatedAt(LocalDateTime.now());

        Ticket savedTicket = ticketRepository.save(ticket);

        return toResponse(savedTicket);
    }

    public PageResponse<TicketResponse> findAll(
            TicketStatus status,
            TicketPriority priority,
            Pageable pageable
    ) {

        Page<TicketResponse> page;

        if (status != null && priority != null) {

            page = ticketRepository
                    .findByStatusAndPriority(status, priority, pageable)
                    .map(this::toResponse);

        } else if (status != null) {

            page = ticketRepository
                    .findByStatus(status, pageable)
                    .map(this::toResponse);

        } else if (priority != null) {

            page = ticketRepository
                    .findByPriority(priority, pageable)
                    .map(this::toResponse);

        } else {

            page = ticketRepository
                    .findAll(pageable)
                    .map(this::toResponse);
        }

        PageResponse<TicketResponse> response = new PageResponse<>();

        response.setContent(page.getContent());
        response.setPage(page.getNumber());
        response.setSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setFirst(page.isFirst());
        response.setLast(page.isLast());

        return response;
    }

    public TicketResponse findById(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Ticket não encontrado")
                );

        return toResponse(ticket);
    }

    public TicketResponse update(Long id, TicketRequest ticketRequest) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Ticket não encontrado")
                );

        ticket.setTitle(ticketRequest.getTitle());
        ticket.setDescription(ticketRequest.getDescription());
        ticket.setStatus(ticketRequest.getStatus());
        ticket.setPriority(ticketRequest.getPriority());
        ticket.setResponsible(ticketRequest.getResponsible());

        Ticket updatedTicket = ticketRepository.save(ticket);

        return toResponse(updatedTicket);
    }

    public void delete(Long id) {

        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Ticket não encontrado")
                );

        ticketRepository.delete(existingTicket);
    }

    private TicketResponse toResponse(Ticket ticket) {

        TicketResponse ticketResponse = new TicketResponse();

        ticketResponse.setId(ticket.getId());
        ticketResponse.setTitle(ticket.getTitle());
        ticketResponse.setDescription(ticket.getDescription());
        ticketResponse.setStatus(ticket.getStatus());
        ticketResponse.setPriority(ticket.getPriority());
        ticketResponse.setCreatedAt(ticket.getCreatedAt());
        ticketResponse.setResponsible(ticket.getResponsible());

        return ticketResponse;
    }
}