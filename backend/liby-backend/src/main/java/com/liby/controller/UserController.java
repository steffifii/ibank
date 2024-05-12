package com.liby.controller;

import com.liby.dao.UserDao;
import com.liby.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserDao userDao;

    @GetMapping
    public List<User> getAllUsers() {
        try {
            return userDao.getAllUsersWithTransactions();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all users");
            throw new RuntimeException("Failed to fetch users", e);
        }
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        try {
            return userDao.getUserById(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get user by id");
            throw new RuntimeException("Failed to fetch user by Id", e);
        }
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        try {
            return userDao.saveUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new user");
            throw new RuntimeException("Failed to save new user", e);
        }
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        try {
            return userDao.updateUser(id, updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user");
            return null;
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        try {
            userDao.deleteUser(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User deletion failed");
            throw new RuntimeException("Failed to delete user", e);
        }
    }
}
