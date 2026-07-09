-- =====================================
-- Employee Management System Database
-- PostgreSQL Schema
-- =====================================


-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;



-- =====================================
-- USERS TABLE
-- =====================================

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    username VARCHAR(50) UNIQUE NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password TEXT NOT NULL,

    role VARCHAR(20) DEFAULT 'MANAGER',

    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- =====================================
-- DEPARTMENTS TABLE
-- =====================================

CREATE TABLE departments (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- =====================================
-- EMPLOYEES TABLE
-- =====================================

CREATE TABLE employees (

    id SERIAL PRIMARY KEY,


    first_name VARCHAR(100) NOT NULL,


    last_name VARCHAR(100) NOT NULL,


    email VARCHAR(100) UNIQUE NOT NULL,


    phone VARCHAR(20),


    position VARCHAR(100),


    salary DECIMAL(10,2),


    hire_date DATE,


    status VARCHAR(20) DEFAULT 'ACTIVE',


    department_id INTEGER,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,



    CONSTRAINT fk_employee_department

    FOREIGN KEY(department_id)

    REFERENCES departments(id)

    ON DELETE SET NULL

);



-- =====================================
-- INDEXES (Performance)
-- =====================================


CREATE INDEX idx_users_email
ON users(email);



CREATE INDEX idx_employee_email
ON employees(email);



CREATE INDEX idx_employee_department
ON employees(department_id);



-- =====================================
-- DEFAULT DATA
-- =====================================


INSERT INTO departments(name,description)
VALUES

('IT','Information Technology'),

('HR','Human Resources'),

('Finance','Finance Department'),

('Marketing','Marketing Department');



-- =====================================
-- END
-- =====================================