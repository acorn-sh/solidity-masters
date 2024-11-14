CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Unsolved',
    topics JSONB NOT NULL,
    companies JSONB NOT NULL,
    description TEXT NOT NULL,
    examples JSONB NOT NULL,
    constraints JSONB NOT NULL,
    follow_up TEXT,
    interview_data JSONB,
    hints JSONB,
    solidity_template JSONB,
    testcases JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Optional: If you want to start fresh every time, uncomment the following line
-- DROP TABLE IF EXISTS problems CASCADE;
