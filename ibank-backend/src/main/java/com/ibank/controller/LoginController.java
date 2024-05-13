package com.ibank.controller;

import com.ibank.dao.UserDao;
import com.ibank.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            return authenticationService.authenticateUser(loginRequest.get("email"), loginRequest.get("password"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials" + e.getMessage());
        }
    }
}
