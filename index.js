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

    }
})}

function showDepartments(){
 db.query('SELECT * from allDepts', function (err, results){
    console.table(results);
    displayMenu();
 })
}
function showEmployees(){
 db.query('SELECT * from allEmployees', function (err, results){
    console.table(results);
    displayMenu();
 })
}
function showRoles(){
 db.query('SELECT * from allRoles', function (err, results){
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
            displayMenu();
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

        console.log(departments)
     
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
    }
]).then((answer)=>{
        const role = answer.role;
        db.query('INSERT INTO allRoles (job_title, role_id, roleDept, salary) VALUES (?)', department, function (err, results){
            console.table(results);
            showDepartments();
            displayMenu();
         })
    })
})
    
}
function showDepartments(){
 db.query('SELECT * from allDepts', function (err, results){
    console.table(results);
    displayMenu();
 })
}
displayMenu();