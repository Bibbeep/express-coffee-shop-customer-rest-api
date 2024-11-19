DROP TYPE IF EXISTS gender CASCADE;
CREATE TYPE gender AS ENUM ('male', 'female');

DROP TYPE IF EXISTS item_type CASCADE;
CREATE TYPE item_type AS ENUM ('drink', 'food', 'snack', 'others');