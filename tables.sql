CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL Primary key auto_increment,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone int NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    dob DATE NOT NULL,
    photo VARCHAR(255),
    CONSTRAINT UNIQUE (email, phone, username)
) CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL Primary key auto_increment,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    model VARCHAR(255),
    brand VARCHAR(255),
    manufacturer VARCHAR(255),
    usage_mode ENUM('Sale', 'Lease', 'Use', 'Consumption') NOT NULL,
    cost_price DECIMAL NOT NULL,
    useful_life INT,
    manufacture_date DATE NOT NULL,
    procurement_date DATE NOT NULL,
    color VARCHAR(255),
    serial_number VARCHAR(9),
    type VARCHAR('Fixed', 'Suppliable') NOT NULL,
    price DECIMAL,
    photo VARCHAR(255),
) CREATE TABLE IF NOT EXISTS vendors (
    id INT NOT NULL Primary key auto_increment,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone INT NOT NULL,
    photo VARCHAR(255),
    CONSTRAINT UNIQUE (phone, email)
) CREATE TABLE IF NOT EXISTS item_outs (
    id INT NOT NULL Primary key auto_increment,
    user_id INT,
    `mode` ENUM('Sale', 'Lease', 'Damage', 'Use', 'Consumption'),
    item_id INT,
    Constraint Foreign key(item_id) references items(id),
    `date` DATE,
    remark VARCHAR(255),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES Users(id)
) CREATE TABLE IF NOT EXISTS item_ins (
    id INT NOT NULL Primary key auto_increment,
    item_id INT,
    CONSTRAINT FOREIGN KEY (item_id) REFERENCES items(id),
    unit_cost DECIMAL,
    quantity VARCHAR(255) NOT NULL,
    vendor_id INT,
    CONSTRAINT FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    date DATE,
    `mode` ENUM('Supply', 'Return', 'Donation'),
    item_out_id INT,
    CONSTRAINT FOREIGN KEY (item_out_id) REFERENCES item_outs(id),
    remark VARCHAR(255)
) CREATE TABLE IF NOT EXISTS maintenances (
    id INT NOT NULL Primary Key auto_increment,
    item_id INT,
    CONSTRAINT FOREIGN KEY (item_id) REFERENCES items(id),
    `mode` Enum('Repair', 'Replacement', 'Both'),
    vendor_id INT,
    CONSTRAINT FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    `date` DATE,
    issue VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    total_amount DECIMAL NOT NULL,
    paid_amount DECIMAL NOT NULL,
    remark VARCHAR(255)
) CREATE TABLE IF NOT EXISTS receipts (
    id INT NOT NULL Primary Key auto_increment,
    item_id INT,
    CONSTRAINT FOREIGN KEY (item_id) REFERENCES items(id),
    user_id INT,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id),
    quantity VARCHAR(255) NOT NULL,
    cost DECIMAL NOT NULL,
    `date` DATE,
) CREATE TABLE IF NOT EXISTS payments (
    id INT NOT NULL Primary Key auto_increment,
    receipt_id INT,
    CONSTRAINT FOREIGN KEY (receipt_id) REFERENCES receipts(id),
    total_amount DECIMAL NOT NULL,
    `date_paid` DATE
)
CREATE TABLE IF NOT EXISTS item_out_groups(
    id INT NOT NULL PRIMARY KEY auto_increment,
    total_amount DECIMAL,
    remark VARCHAR(255) NOT NULL,
    buyer_id INT,
    CONSTRAINT FOREIGN KEY (buyer_id) REFERENCES users(id)
)
CREATE TABLE IF NOT EXISTS item_in_groups(
    id INT NOT NULL PRIMARY KEY auto_increment,
    total_amount DECIMAL,
    remark VARCHAR(255) NOT NULL,
    vendor_id INT,
    CONSTRAINT FOREIGN KEY (vendor_id) REFERENCES vendors(id)
)