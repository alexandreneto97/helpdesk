package com.alexandre.helpdesk.repository;

import com.alexandre.helpdesk.entity.Ticket;
import com.alexandre.helpdesk.entity.TicketPriority;
import com.alexandre.helpdesk.entity.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Page<Ticket> findByStatus(TicketStatus status, Pageable pageable);
    Page<Ticket> findByPriority(TicketPriority priority, Pageable pageable);
    Page<Ticket> findByStatusAndPriority(TicketStatus status, TicketPriority priority, Pageable pageable);



}
