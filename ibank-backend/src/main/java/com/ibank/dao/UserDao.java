package com.ibank.dao;

import com.ibank.model.Transaction;
import com.ibank.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
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
        user.setRole(rs.getString("role"));
        user.setEmail(rs.getString("email"));
        user.setPhone(rs.getString("phone"));
        user.setPassword(rs.getString("password"));
        user.setGender(rs.getString("gender"));
        user.setAddress(rs.getString("address"));
        user.setBirthdate(rs.getDate("birthdate"));
        user.setMembershipDate(rs.getDate("membership_date"));
        user.setBalance(rs.getInt("balance"));

        return user;
    }

    public List<User> getUsers() {
        String sql = "SELECT u.user_id, u.name, u.role, u.email, u.phone, u.password, u.gender, u.address, " +
                "u.birthdate, u.membership_date, u.balance " +
                "FROM users u " +
                "WHERE u.deleted = FALSE ";
        List<User> users = jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = mapRowToUser(rs, rowNum);
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
        String sql = "INSERT INTO Users (name, role, email, phone, password, gender, address, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getRole(),
                user.getEmail(),
                user.getPhone(),
                user.getPassword(),
                user.getGender(),
                user.getAddress(),
                user.getBirthdate());
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
                    "address = ?, birthdate = ?, phone = ?" +
                    "WHERE user_id = ?";
            jdbcTemplate.update(sql,
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.getPassword(),
                    updatedUser.getGender(),
                    updatedUser.getAddress(),
                    updatedUser.getBirthdate(),
                    updatedUser.getPhone(),
                    userId);
            return updatedUser;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            return null;
        }
    }

    public void updateUserBalance(int userId, int newBalance) {
        String sql = "UPDATE users SET balance = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, newBalance, userId);
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