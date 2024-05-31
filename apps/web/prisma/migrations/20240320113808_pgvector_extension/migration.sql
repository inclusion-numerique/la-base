DO $$
    BEGIN
        -- Check if 'pgvector' is available
        IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'pgvector') THEN
            -- Create 'pgvector' extension if it is available
            RAISE NOTICE 'Installing pgvector extension';
            EXECUTE 'CREATE EXTENSION IF NOT EXISTS pgvector';
        ELSE
            -- Fallback to 'vector' if 'pgvector' is not available
            RAISE NOTICE 'pgvector not available, installing vector extension instead';
            EXECUTE 'CREATE EXTENSION IF NOT EXISTS vector';
        END IF;
    END $$;
