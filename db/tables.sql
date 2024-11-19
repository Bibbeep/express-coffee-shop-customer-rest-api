DROP TABLE IF EXISTS
	user_account,
	profile,
	item,
	item_specification,
	item_option,
	store,
	cart,
	cart_item,
	user_order,
	order_delivery_detail,
	delivery_address,
	voucher,
	voucher_store_allocation,
	voucher_store_item_specification,
	payment,
	invoice CASCADE;

CREATE TABLE IF NOT EXISTS user_account (
    id int GENERATED ALWAYS AS IDENTITY,
	username varchar(30) NOT NULL,
	email varchar(255) UNIQUE NOT NULL,
	password varchar(60),
	google_id varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS profile (
	id int GENERATED ALWAYS AS IDENTITY,
	user_account_id int UNIQUE NOT NULL, 
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	profile_gender gender,
	birthdate date,
	phone_number varchar(15),
	picture_url text,
	PRIMARY KEY (id),
	FOREIGN KEY (user_account_id) REFERENCES user_account(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item (
	id int GENERATED ALWAYS AS IDENTITY,
	name varchar(255) NOT NULL,
	price int NOT NULL,
	type item_type NOT NULL,
	description text,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS item_option (
	id int GENERATED ALWAYS AS IDENTITY,
	name varchar(100) NOT NULL,
	type varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS item_specification (
	id int GENERATED ALWAYS AS IDENTITY,
	item_id int NOT NULL REFERENCES item(id),
	item_option_id int REFERENCES item_option(id),
	price int DEFAULT 0,
	PRIMARY KEY (id)
);