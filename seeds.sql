USE work_db;

INSERT into allDepts (deptName)
VALUES 
("Math"),
("Science"), 
("English"),
("History");

INSERT into allRoles (job_title, dept_id, salary)
VALUES 
("Statistician",1, 50000),
("Biologist",2, 150000), 
("Writer",3, 200000),
("Historian",4, 300000);

INSERT into allEmployees (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Campbell", 1, 2),
("Joe", "Rehfuss", 2, NULL),
("Henry", "Weigand", 3, 2),
("Eli", "Wood", 4, 2);
