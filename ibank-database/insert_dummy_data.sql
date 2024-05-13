-- Inserting dummy data for Users table
INSERT INTO Users (name, role, email, phone, password, gender, address, birthdate, deleted, balance)
VALUES 
    ('Admin', 'admin', 'admin@example.com', '432423525', 'admin123', 'Male', '123 Admin Street', '1990-01-01', false, 0),
    ('Teller', 'teller', 'teller@example.com', '543513424432','teller123', 'Female', '456 Teller Street', '1995-05-15', false, 0),
    ('Customer', 'customer', 'customer@example.com', '4543525325','customer123', 'Female', '789 Customer Street', '1993-05-15', false, 19876543.21);

-- Inserting dummy data for Transactions table for the Customer User
SET @balance := (SELECT balance FROM Users WHERE name = 'Customer'); -- Initialize the balance variable with the initial balance
INSERT INTO Transactions (user_id, transaction_date, value, description, balance_before, balance_after)
SELECT 
    user_id, 
    DATE_ADD(CURRENT_DATE(), INTERVAL -FLOOR(RAND()*30) DAY) AS transaction_date,
    value,
    description,
    balance_before,
    balance_after
FROM (
    SELECT 
        user_id,
        DATE_ADD(CURRENT_DATE(), INTERVAL -FLOOR(RAND()*30) DAY) AS transaction_date,
        FLOOR(RAND()*1000) + 100 AS value,
        CASE 
            WHEN RAND() < 0.3 THEN 'Starbucks' 
            WHEN RAND() < 0.6 THEN 'NTUC' 
            ELSE 'Coffee Bean' 
        END AS description,
        @balance AS balance_before,
        @balance := CASE 
                        WHEN RAND() < 0.5 THEN @balance + (FLOOR(RAND()*1000) + 100) 
                        ELSE @balance - (FLOOR(RAND()*1000) + 100) 
                    END AS balance_after
    FROM (
        SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
        UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
    ) t
    CROSS JOIN (
        SELECT user_id FROM Users WHERE name = 'Customer'
    ) u
) dummy_data
LIMIT 20;