-- Inserting dummy data for Users table
INSERT INTO Users (name, email, phone, password, gender, address, birthdate, deleted, balance)
VALUES 
    ('Admin User', 'admin@example.com', '432423525', 'admin123', 'Male', '123 Admin Street', '1990-01-01', false, 0),
    ('Teller User', 'teller@example.com', '543513424432','teller123', 'Female', '456 Teller Street', '1995-05-15', false, 19876543.21);

-- Inserting dummy data for Transactions table for the Teller User
SET @balance := (SELECT balance FROM Users WHERE name = 'Teller User'); -- Initialize the balance variable with the initial balance
INSERT INTO Transactions (user_id, transaction_date, value, description, balance_before, balance_after)
SELECT 
    user_id, 
    DATE_ADD(CURRENT_DATE(), INTERVAL -FLOOR(RAND()*30) DAY), -- Random date within the last 30 days
    FLOOR(RAND()*1000) + 100, -- Random value between 100 and 1099
    CASE 
        WHEN RAND() < 0.3 THEN 'Starbucks' -- 30% chance for Starbucks transaction
        WHEN RAND() < 0.6 THEN 'NTUC' -- 30% chance for NTUC transaction
        ELSE 'Coffee Bean' -- 40% chance for Coffee Bean transaction
    END AS description,
    @balance AS balance_before, -- Use the balance variable
    @balance := CASE 
                    WHEN RAND() < 0.5 THEN @balance + value -- Credit transaction
                    ELSE @balance - value -- Debit transaction
                END AS balance_after -- Update the balance variable and use it
FROM
    (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
CROSS JOIN 
    (SELECT user_id FROM Users WHERE name = 'Teller User') u
LIMIT 20;
