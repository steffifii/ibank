package com.liby.controller;

import com.liby.dao.TransactionDao;
import com.liby.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionDao transactionDao;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        try {
            return transactionDao.getAllTransactions();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all transactions");
            throw new RuntimeException("Failed to fetch transactions", e);
        }
    }

    @GetMapping("/{id}")
    public Transaction getTransaction(@PathVariable int id) {
        try {
            return transactionDao.getTransactionById(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get transaction by id");
            throw new RuntimeException("Failed to fetch transaction by Id", e);
        }
    }
    @GetMapping("/user/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable int userId) {
        try {
            return transactionDao.getTransactionsByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get transactions by user ID");
            throw new RuntimeException("Failed to fetch transactions by user ID", e);
        }
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        try {
            return transactionDao.saveTransaction(transaction);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new transaction");
            throw new RuntimeException("Failed to save new transaction", e);
        }
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable int transactionId, @RequestBody Transaction updatedTransaction) {
        try {
            return transactionDao.updateTransaction(transactionId, updatedTransaction);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update transaction");
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable int transactionId) {
        try {
            transactionDao.deleteTransaction(transactionId);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Transaction deletion failed");
            throw new RuntimeException("Failed to delete transaction", e);
        }
    }
}
