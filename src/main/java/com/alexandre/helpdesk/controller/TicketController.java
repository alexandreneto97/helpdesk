package com.alexandre.helpdesk.controller;

import com.alexandre.helpdesk.dto.PageResponse;
import com.alexandre.helpdesk.dto.TicketRequest;
import com.alexandre.helpdesk.dto.TicketResponse;
import com.alexandre.helpdesk.entity.TicketPriority;
import com.alexandre.helpdesk.entity.TicketStatus;
import com.alexandre.helpdesk.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @Operation(
            summary = "Criar ticket",
            description = "Cria um novo ticket"
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TicketResponse create(
            @Valid @RequestBody TicketRequest ticketRequest
    ) {
        return ticketService.create(ticketRequest);
    }

    @Operation(
            summary = "Listar tickets",
            description = "Retorna uma lista paginada de tickets, podendo filtrar por status e prioridade"
    )
    @GetMapping
    public PageResponse<TicketResponse> findAll(
            Pageable pageable,
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false) TicketPriority priority
    ) {
        return ticketService.findAll(status, priority, pageable);
    }

    @Operation(
            summary = "Buscar ticket por ID",
            description = "Retorna um ticket específico através do seu identificador"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ticket encontrado"),
            @ApiResponse(responseCode = "404", description = "Ticket não encontrado")
    })
    @GetMapping("/{id}")
    public TicketResponse findById(@PathVariable Long id) {
        return ticketService.findById(id);
    }

    @Operation(
            summary = "Atualizar ticket",
            description = "Atualiza os dados de um ticket existente"
    )
    @PutMapping("/{id}")
    public TicketResponse update(
            @PathVariable Long id,
            @Valid @RequestBody TicketRequest ticketRequest
    ) {
        return ticketService.update(id, ticketRequest);
    }

    @Operation(
            summary = "Excluir ticket",
            description = "Exclui um ticket existente através do seu identificador"
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        ticketService.delete(id);
    }
}