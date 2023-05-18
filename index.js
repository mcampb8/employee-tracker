const inquirer = require('inquirer');
const sequelize = require('sequelize');
const mysql = require('mysql2');
const cTable = require('console.table');
const fs = require('fs');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'work_db'
    },
  );
function displayMenu(){
    inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View all departments", "View all employees", "View all roles", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit" ]
    },
]).then((answer)=>{
    const selection = answer.options;
    if(selection === "View all departments"){
        showDepartments();
    } else if(selection === "View all employees"){
        showEmployees();
    } else if (selection === "View all roles"){
        showRoles();
    } else if (selection === "Add a department"){
        addDepartment();
    } else if (selection === "Add a role"){
        addRole();
    } else if (selection === "Add an employee"){
        addEmployee();
    } else if (selection === "Update an employee role"){
        updateEmployeeRole();
    } else if(selection === "Quit"){
        console.log("Goodbye.");
        process.exit();
    }
})}

function showDepartments(){
 db.query('SELECT * from allDepts', function (err, results){
    console.table(results);
    displayMenu();
 })
}
function showEmployees(){
 db.query('SELECT allEmployees.employee_id, allEmployees.first_name, allEmployees.last_name, manager.first_name AS manager, allRoles.job_title, allRoles.salary FROM allEmployees INNER JOIN allRoles ON allEmployees.role_id = allRoles.role_id LEFT JOIN allEmployees manager ON manager.employee_id = allEmployees.manager_id', function (err, results){
    console.table(results);
    displayMenu();
 })
}

function showRoles(){
 db.query('SELECT * from allRoles INNER JOIN allDepts ON allRoles.dept_id = allDepts.dept_id', function (err, results){
    console.table(results);
    displayMenu();
 })
}
function addDepartment(){
    inquirer.prompt([{
        type: "input",
        name: "deptName",
        message: "What is the Name of the Department?"
    }]).then((answer)=>{
        const department = answer.deptName;
        db.query('INSERT INTO allDepts (deptName) VALUES (?)', department, function (err, results){
            console.table(results);
            showDepartments();
         })
    })
    
}
function addRole(){
    db.query('SELECT * from allDepts', function (err, results){
        const departments = results.map((deptRow) => {
            return {
                name: deptRow.deptName,
                value: deptRow.dept_id
            }
        })
     
    inquirer.prompt([{
        type: "input",
        name: "role",
        message: "What is the New Role?",
    },
    {
        type: "list",
        name: "department",
        message: "Which Department is this Role in?",
        choices: departments
    },{
        type: "input",
        name: "salary",
        message: "What is the Salary for this Role?",
    },
]).then((answer)=>{
        const role = answer.role;
        const department = answer.department;
        const salary = answer.salary;
        db.query('INSERT INTO allRoles (job_title, dept_id, salary) VALUES (?,?,?)', [role, department, salary], function (err, results){
            console.table(results);
            showRoles();
         })
    })
})
}
function addEmployee(){
    db.query('SELECT * from allRoles', function (err, results){
        const roleList = results.map((role) => {
            return {
                name: role.job_title,
                value: role.role_id
            }
        })
        db.query('SELECT * from allEmployees', function (err, results){
            const employeeList = results.map((employee)=>{
                return{
                    name: employee.first_name,
                    value: employee.employee_id
                }
            })
            inquirer.prompt([{
                type: "input",
                name: "firstName",
                message: "What is your First Name?",
            },
            {
                type: "input", 
                name: "lastName",
                message: "What is your Last Name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is your role?",
                choices: roleList
            },
            {
                type: "list",
                name: "manager",
                message: "Who is your Manager?",
                choices: employeeList
            },
        ]).then((answer)=>{
            const employeeFirst = answer.firstName;
            const employeeLast = answer.lastName;
            const manager = answer.manager;
            const role = answer.role;
            db.query('INSERT INTO allEmployees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [employeeFirst, employeeLast, role, manager], function (err, results){
                console.table(results);
                showEmployees();
             })
        })
         })
        
       

})
}

function updateEmployeeRole(){

    db.query('SELECT * from allRoles', function (err, results){
        const roleList = results.map((role) => {
            return {
                name: role.job_title,
                value: role.role_id
            }
        })
        db.query('SELECT * from allEmployees', function (err, results){
            const employeeList = results.map((employee)=>{
                return{
                    name: employee.first_name,
                    value: employee.employee_id
                }
            })
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which Employee's Role are you Updating?",
                    choices: employeeList
                },
                {
                type: "list",
                name: "newRole",
                message: "What is the Employee's New Role?",
                choices: roleList
            }
        ]).then((answer)=>{
            const employee = answer.employee;
            const newRole = answer.newRole;

            db.query("UPDATE allEmployees SET role_id = ? WHERE employee_id = ?", [newRole, employee], function(err,results){
                console.table(results);
                showEmployees();
            })
        })
        })
    })
}
displayMenu();