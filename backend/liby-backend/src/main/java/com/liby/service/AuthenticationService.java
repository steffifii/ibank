package com.liby.service;

import com.liby.dao.UserDao;
import com.liby.model.User;
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
            if (user.getPassword().equals(password))
                return ResponseEntity.ok().body("User logged in successfully");
            else
                return ResponseEntity.status(401).body("Incorrect Password");
        }
        return ResponseEntity.status(404).body("Email address is not registered.");
    }
}
