INSERT INTO Users (name, role, email, phone, password, gender, address, birthdate, deleted, balance)
VALUES 
    ('Admin', 'Admin', 'admin@example.com', '432423525', 'admin123', 'Male', '123 Admin Street', '1990-01-01', false, 0),
    ('Teller', 'Teller', 'teller@example.com', '543513424432', 'teller123', 'Female', '456 Teller Street', '1995-05-15', false, 0),
    ('Customer', 'Customer', 'testest@example.com', '454525325','customer123', 'Female', '789 Customer Street', '1993-05-15', false, 19876543.21),
    ('Stella Tan', 'Customer', 'test@example.com', '4363643','customer123', 'Female', '789 Tret Street', '1993-02-15', false, 19876543.21),
    ('Macey', 'Customer', 'hjkekrsewr@example.com', '45435525','customer123', 'Female', '789 Treck Street', '1993-07-15', false, 19876543.21),
    ('Goh Chonk Tong', 'Customer', 'gdfgdgdfg@example.com', '4543525325','customer123', 'Female', 'Yishun Street', '1993-05-25', false, 19876543.21),
    ('Ahmad', 'Customer', 'fewrwer@example.com', '54234324','customer123', 'Female', 'Sengkang Street', '1996-05-25', false, 19876543.21),
    ('Viknesh', 'Customer', 'rewrre@example.com', '8768567456','customer123', 'Female', '789 Bishan Street', '1997-05-15', false, 19876543.21),
    ('Lucy', 'Customer', 'erwrewr@example.com', '84554677','customer123', 'Female', '789 Dhoby Ghaut Street', '1998-03-15', false, 19876543.21);
    
INSERT INTO Users (name, role, email, phone, password, gender, address, birthdate, deleted, balance)
SELECT
    CONCAT(
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('abcdefghijklmnopqrstuvwxyz', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('abcdefghijklmnopqrstuvwxyz', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('abcdefghijklmnopqrstuvwxyz', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('abcdefghijklmnopqrstuvwxyz', FLOOR(RAND() * 26) + 1, 1)
    ) AS name, -- Generate random names
    'Customer' AS role,
    CONCAT('customer', RAND(), '@example.com') AS email,
    FLOOR(100000000 + RAND() * 899999999) AS phone, 
    'customer123' AS password,
    CASE FLOOR(RAND() * 2)
        WHEN 0 THEN 'Male'
        ELSE 'Female'
    END AS gender, 
    CONCAT('123 Random Street', ' ', RAND()) AS address, 
    DATE_SUB('2003-01-01', INTERVAL FLOOR(RAND() * 30) YEAR) AS birthdate, 
    false AS deleted,
    FLOOR(RAND() * 1000000) + 100000 AS balance 
FROM
    information_schema.tables
LIMIT 25; 


