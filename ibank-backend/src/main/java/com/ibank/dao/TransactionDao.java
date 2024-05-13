package com.ibank.dao;

import com.ibank.model.Transaction;
import com.ibank.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.time.LocalDate;
import java.sql.Date;

@Repository
public class TransactionDao {
    private final JdbcTemplate jdbcTemplate;
    private final UserDao userDao;

    @Autowired
    public TransactionDao(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
    }

    private Transaction mapRowToTransaction(ResultSet rs, int rowNum) throws SQLException {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rs.getInt("transaction_id"));
        transaction.setTransactionDate(rs.getDate("transaction_date"));
        transaction.setValue(rs.getInt("value"));
        transaction.setBalanceBefore(rs.getInt("balance_before"));
        transaction.setBalanceAfter(rs.getInt("balance_after"));
        transaction.setDescription(rs.getString("description"));

        int userId = rs.getInt("user_id");
        User user = userDao.getUserById(userId);
        if (user != null) {
            transaction.setTransactionUserId(userId);
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID is not found in transaction");
        }

        return transaction;
    }

    public List<Transaction> getAllTransactions() {
        String sql = "SELECT * FROM transactions";
        return jdbcTemplate.query(sql, this::mapRowToTransaction);
    }

    public Transaction getTransactionById(int transactionId) {
        String sql = "SELECT * FROM transactions WHERE transaction_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToTransaction, transactionId);
    }

    public List<Transaction> getTransactionsByUserId(int userId) {
        String sql = "SELECT * FROM transactions WHERE user_id = ?";
        return jdbcTemplate.query(sql, this::mapRowToTransaction, userId);
    }

    public Transaction saveTransaction(Transaction transaction) {
        int userBalance = userDao.getUserBalance(transaction.getTransactionUserId());
        int finalBalance = userBalance + transaction.getValue();

        LocalDate currentDate = LocalDate.now();
        Date sqlCurrentDate = Date.valueOf(currentDate);

        String sql = "INSERT INTO `transaction` (transaction_user_id, value, description, transaction_date, balance_before, balance_after) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                transaction.getTransactionUserId(),
                transaction.getValue(),
                transaction.getDescription(),
                sqlCurrentDate,
                userBalance,
                finalBalance);

        userDao.updateUserBalance(transaction.getTransactionUserId(), finalBalance);

        return transaction;
    }

    public boolean doesTransactionExist(int transactionId) {
        String sql = "SELECT COUNT(*) FROM transactions WHERE transaction_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, transactionId);
        return count > 0;
    }

    public Transaction updateTransaction(int transactionId, Transaction updatedTransaction) {
        if (doesTransactionExist(transactionId)) {
            String sql = "UPDATE transactions SET user_id = ?, transaction_date = ?, description = ?, value = ?, " +
                    "WHERE transaction_id = ?";
            jdbcTemplate.update(sql,
                    updatedTransaction.getTransactionUserId(),
                    updatedTransaction.getTransactionDate(),
                    updatedTransaction.getDescription(),
                    updatedTransaction.getValue(),
                    transactionId);
            return updatedTransaction;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
            return null;
        }
    }

    public void deleteTransaction(int transactionId) {
        if (doesTransactionExist(transactionId)) {
            String sql = "DELETE FROM transactions WHERE transaction_id = ?";
            jdbcTemplate.update(sql, transactionId);
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
        }
    }
}
