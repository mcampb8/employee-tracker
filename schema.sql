DROP DATABASE if EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE allDepts (
    deptName VARCHAR(30) NOT NULL,
    dept_id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE allRoles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INT NOT NULL
);

CREATE TABLE allEmployees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);


