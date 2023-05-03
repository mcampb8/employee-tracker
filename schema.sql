DROP DATABASE if EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE allDepts (
    deptName VARCHAR(255) NOT NULL,
    dept_id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE allRoles (
    job_title VARCHAR(255) NOT NULL,
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    roleDept INT NOT NULL,
    salary INT NOT NULL
);

CREATE TABLE allEmployees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(255) NOT NULL
);


