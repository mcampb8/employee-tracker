USE work_db;

INSERT into allDepts (deptName)
VALUES 
("Math"),
("Science"), 
("English"),
("History");

INSERT into allRoles (job_title, roleDept, salary)
VALUES 
("Teacher","Education", 50000),
("Engineer", "Engineering", 150000), 
("Lawyer", "Law", 200000),
("Doctor", "Medical", 300000);

INSERT into allEmployees (first_name, last_name, job_title, department, salary, manager)
VALUES 
("Michael", "Campbell", "Trapeze Artist", "Circus", 60000, "Barnum and Bailey" ),
("Joe", "Rehfuss", "Manatee Expert", "Marine Department", 1, "Manatee Mike" ),
("Henry", "Weigand", "Geographer", "Maps", 99999, "Phileas Fogg" ),
("Eli", "Wood", "EDM DJ", "Music", 125000, "Daft Punk" );
