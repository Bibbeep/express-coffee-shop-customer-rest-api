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

CREATE OR REPLACE PROCEDURE remove_user_data()
LANGUAGE plpgsql
AS $$
BEGIN
	EXECUTE 'TRUNCATE TABLE user_account CASCADE';
    EXECUTE 'TRUNCATE TABLE profile CASCADE';
    EXECUTE 'ALTER SEQUENCE user_account_id_seq RESTART WITH 1';
    EXECUTE 'ALTER SEQUENCE profile_id_seq RESTART WITH 1';
END;
$$;

select * from user_account;
select * from profile;