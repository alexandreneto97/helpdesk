package com.alexandre.helpdesk.entity;

import com.alexandre.helpdesk.exception.InvalidEnumValueException;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum TicketPriority {

    LOW,
    MEDIUM,
    HIGH,
    CRITICAL;

    @JsonCreator
    public static TicketPriority fromString(String value) {

        try {
            return TicketPriority.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidEnumValueException("Prioridade inválida. Valores permitidos: LOW, MEDIUM, HIGH, CRITICAL");
        }


    }

}
