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

CREATE OR REPLACE PROCEDURE remove_menu_data()
LANGUAGE plpgsql
AS $$
BEGIN
	EXECUTE 'TRUNCATE TABLE item CASCADE';
    EXECUTE 'TRUNCATE TABLE item_option CASCADE';
    EXECUTE 'TRUNCATE TABLE item_specification CASCADE';
    EXECUTE 'ALTER SEQUENCE item_id_seq RESTART WITH 1';
    EXECUTE 'ALTER SEQUENCE item_option_id_seq RESTART WITH 1';
    EXECUTE 'ALTER SEQUENCE item_specification_id_seq RESTART WITH 1';
END;
$$;

