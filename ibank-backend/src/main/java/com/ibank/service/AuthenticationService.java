package com.ibank.service;

import com.ibank.dao.UserDao;
import com.ibank.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserDao userDao;

    public ResponseEntity<?> authenticateUser(String email, String password) {
        User user = userDao.findByEmail(email);
        if (user != null) {
            if (user.getPassword().equals(password)) {
                if (user.getRole().equals("Teller")) {
                    return ResponseEntity.ok().body("Teller logged in successfully");
                } else if (user.getRole().equals("Admin")) {
                    return ResponseEntity.ok().body("Administrator logged in successfully");
                } else {
                    return ResponseEntity.status(403).body("Forbidden. Please contact administrator. User role: " + user.getRole());
                }
            }
            else
                return ResponseEntity.status(401).body("Incorrect Password. Please try again.");
        }
        return ResponseEntity.status(404).body("User not found. Please contact admin.");
    }
}
