package com.alexandre.helpdesk.dto;

import com.alexandre.helpdesk.entity.TicketPriority;
import com.alexandre.helpdesk.entity.TicketStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TicketResponse {

    private Long id;

    private String title;

    private String description;

    private TicketStatus status;

    private TicketPriority priority;

    private LocalDateTime createdAt;

    private String responsible;
}