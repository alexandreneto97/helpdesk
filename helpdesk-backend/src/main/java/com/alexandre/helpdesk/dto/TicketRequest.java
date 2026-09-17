package com.alexandre.helpdesk.dto;

import com.alexandre.helpdesk.entity.TicketPriority;
import com.alexandre.helpdesk.entity.TicketStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequest {

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 255, message = "O título deve ter no máximo 255 caracteres")
    private String title;

    @NotBlank(message = "A descrição é obrigatória")
    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres")
    private String description;

    @NotNull(message = "O status é obrigatório")
    private TicketStatus status;

    @NotNull(message = "A prioridade é obrigatória")
    private TicketPriority priority;

    @NotBlank(message = "O responsável é obrigatório")
    @Size(max = 100, message = "O responsável deve ter no máximo 100 caracteres")
    private String responsible;
}