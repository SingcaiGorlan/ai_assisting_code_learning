-- Create extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    role VARCHAR(20) DEFAULT 'student',
    status VARCHAR(20) DEFAULT 'active',
    settings JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    real_name VARCHAR(50),
    gender VARCHAR(10),
    birthday DATE,
    school VARCHAR(100),
    grade VARCHAR(20),
    learning_style VARCHAR(50),
    interests TEXT[],
    learning_goals JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge points table
CREATE TABLE IF NOT EXISTS knowledge_points (
    id BIGSERIAL PRIMARY KEY,
    subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
    prerequisite_ids BIGINT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_knowledge_points_subject_id ON knowledge_points(subject_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_points_tags ON knowledge_points USING gin(tags);

-- Chat records table
CREATE TABLE IF NOT EXISTS chat_records (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    subject_id BIGINT REFERENCES subjects(id) ON DELETE SET NULL,
    knowledge_point_ids BIGINT[] DEFAULT '{}',
    tokens INTEGER DEFAULT 0,
    cost DECIMAL(10, 6) DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_records_session_id ON chat_records(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_records_user_id ON chat_records(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_records_created_at ON chat_records(created_at);

-- Learning progress table
CREATE TABLE IF NOT EXISTS learning_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
    knowledge_point_id BIGINT REFERENCES knowledge_points(id) ON DELETE CASCADE,
    mastery_level INTEGER DEFAULT 0, -- 0-100
    review_count INTEGER DEFAULT 0,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    next_review_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, knowledge_point_id)
);

CREATE INDEX IF NOT EXISTS idx_learning_progress_user_subject ON learning_progress(user_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_next_review ON learning_progress(next_review_at);

-- Exercises table
CREATE TABLE IF NOT EXISTS exercises (
    id BIGSERIAL PRIMARY KEY,
    subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
    knowledge_point_ids BIGINT[] DEFAULT '{}',
    question TEXT NOT NULL,
    options JSONB, -- multiple choice options
    answer TEXT,
    explanation TEXT,
    difficulty INTEGER DEFAULT 1, -- 1-5
    question_type VARCHAR(50) DEFAULT 'single_choice', -- single_choice, multiple_choice, fill_blank, short_answer
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_exercises_subject_id ON exercises(subject_id);
CREATE INDEX IF NOT EXISTS idx_exercises_knowledge_point_ids ON exercises USING gin(knowledge_point_ids);

-- Initial data
INSERT INTO subjects (name, code, description, icon, sort_order) VALUES
('Mathematics', 'math', 'Mathematics subject', 'calculator', 1),
('Physics', 'physics', 'Physics subject', 'atom', 2),
('Chemistry', 'chemistry', 'Chemistry subject', 'flask', 3),
('Programming', 'programming', 'Programming learning', 'code', 4),
('English', 'english', 'English learning', 'language', 5)
ON CONFLICT (code) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at);
CREATE INDEX IF NOT EXISTS idx_chat_records_user_created ON chat_records(user_id, created_at DESC);
