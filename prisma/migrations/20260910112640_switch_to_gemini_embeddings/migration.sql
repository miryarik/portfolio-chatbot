-- This is an empty migration.
TRUNCATE TABLE "ContentChunk";
ALTER TABLE "ContentChunk" ALTER COLUMN embedding TYPE vector(768);