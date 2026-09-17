package com.alexandre.helpdesk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String title;

    @Column(name = "descricao")
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridade")
    private TicketPriority priority;

    @Column(name = "responsavel")
    private String responsible;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;


}