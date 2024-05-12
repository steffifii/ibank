package com.liby.dao;

import com.liby.model.Transaction;
import com.liby.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUserId(rs.getInt("user_id"));
        user.setName(rs.getString("name"));
        user.setUserType(rs.getString("user_type"));
        user.setEmail(rs.getString("email"));
        user.setPhone(rs.getString("phone"));
        user.setPassword(rs.getString("password"));
        user.setGender(rs.getString("gender"));
        user.setAddress(rs.getString("address"));
        user.setBirthdate(rs.getDate("birthdate"));
        user.setBalance(rs.getInt("balance"));

        return user;
    }

    public List<User> getAllUsersWithTransactions() {
        String sql = "SELECT u.user_id, u.name, u.email, u.password, u.gender, u.address, " +
                "u.birthdate, u.borrows_left, u.membership_date, " +
                "FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id " +
                "WHERE u.deleted = FALSE ";
        List<User> users = jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = mapRowToUser(rs, rowNum);
                List<Transaction> transactions = getTransactionsForUser(user.getUserId());
                user.setTransactions(transactions);
                return user;
            }
        });
        return users;
    }

    private List<Transaction> getTransactionsForUser(int userId) {
        String sql = "SELECT t.transaction_id, t.transaction_date, t.value, t.description " +
                "FROM Transactions t " +
                "WHERE t.user_id = ? " +
                "ORDER BY t.transaction_date ASC";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Transaction transaction = new Transaction();
            transaction.setTransactionId(rs.getInt("transaction_id"));
            transaction.setTransactionDate(rs.getDate("transaction_date"));
            transaction.setValue(rs.getInt("value"));
            transaction.setDescription(rs.getString("description"));
            return transaction;
        }, userId);
    }

    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToUser, userId);
    }

    public User saveUser(User user) {
        String sql = "INSERT INTO users (name, email, phone, password, gender, address, birthdate, balance) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getPassword(),
                user.getGender(),
                user.getAddress(),
                user.getBirthdate(),
                user.getBalance());
        return user;
    }

    public boolean doesUserExist(int userId) {
        String sql = "SELECT COUNT(*) FROM users WHERE user_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count > 0;
    }

    public User updateUser(int userId, User updatedUser) {
        if (doesUserExist(userId)) {
            String sql = "UPDATE users SET name = ?, email = ?, password = ?, gender = ?, " +
                    "address = ?, birthdate = ?, borrows_left = ?, phone = ?, balance = ? " +
                    "WHERE user_id = ?";
            jdbcTemplate.update(sql,
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.getPassword(),
                    updatedUser.getGender(),
                    updatedUser.getAddress(),
                    updatedUser.getBirthdate(),
                    updatedUser.getPhone(),
                    updatedUser.getBalance(),
                    userId);
            return updatedUser;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            return null;
        }
    }

    public User findByEmail(String email) {
        try {
            String sql = "SELECT * FROM users WHERE email = ?";
            return jdbcTemplate.queryForObject(sql, this::mapRowToUser, email);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No User found with email: " + email + e);
            return null;
        }
    }
    public void deleteUser(int userId) {
        if (doesUserExist(userId)) {
            String sql = "UPDATE users SET deleted = TRUE where user_id = ?";
            jdbcTemplate.update(sql, userId);
            ResponseEntity.ok("User marked as deleted");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}