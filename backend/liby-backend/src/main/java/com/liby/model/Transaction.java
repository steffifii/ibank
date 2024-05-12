package com.liby.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "transaction_date")
    private Date transactionDate;
    private int value;
    private int balance_before;
    private int balance_after;
    private String description;

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public Date getTransactionDate() {
        return transactionDate;
    }
    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }
    public int getValue() {
        return value;
    }
    public void setValue(int value) {
        this.value = value;
    }
    public int getBalanceBefore() {
        return balance_before;
    }

    public void setBalanceBefore(int balance_before) {
        this.balance_before = balance_before;
    }
    public int getBalanceAfter() {
        return balance_after;
    }
    public void setBalanceAfter(int balance_after) {
        this.balance_after = balance_after;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}