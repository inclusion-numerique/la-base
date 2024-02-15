-- Set rating to 1 where rating is 0 (minimum is 1)

UPDATE feedback SET rating = 1 WHERE rating = 0;

