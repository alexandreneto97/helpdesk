package com.alexandre.helpdesk.controller;

import com.alexandre.helpdesk.dto.LoginRequest;
import com.alexandre.helpdesk.dto.LoginResponse;
import com.alexandre.helpdesk.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest
    ) {

        Authentication authentication =
                UsernamePasswordAuthenticationToken.unauthenticated(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                );

        Authentication authenticated =
                authenticationManager.authenticate(authentication);

        String token = jwtService.generateToken(authenticated);

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }
}