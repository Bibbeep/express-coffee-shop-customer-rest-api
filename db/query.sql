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

DROP TYPE IF EXISTS gender CASCADE;

CREATE TYPE gender AS ENUM ('male', 'female');

CREATE TABLE IF NOT EXISTS user_account (
    id int GENERATED ALWAYS AS IDENTITY,
	username varchar(30) NOT NULL,
	email varchar(255) UNIQUE NOT NULL,
	password varchar(60),
	googleId varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS profile (
	id int GENERATED ALWAYS AS IDENTITY,
	user_account_id int REFERENCES user_account(id), 
	first_name varchar(100),
	last_name varchar(100),
	profile_gender gender NOT NULL,
	birthdate date NOT NULL,
	address varchar(255),
	phone_number varchar(15),
	picture_url text,
	PRIMARY KEY (id)
);