const inquirer = require('inquirer');
const sequelize = require('sequelize');
const fs = require('fs');
inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View all departments", "View all employees", "View all roles", "Add a department", "Add a role", "Add an employee", "Update an employee role" ]
    },
]).then((answer)=>{
    const selection = answer.options;
    if(selection === "View all departments"){
        showDepartments();
    } else if(selection === "View all employees"){
        showEmployees();
    } else if (selection === "View all roles"){
        showRoles();
    } else if (selection === "Add a deparment"){
        addDepartment();
    } else if (selection === "Add a role"){
        addRole();
    } else if (selection === "Add an employee"){
        addEmployee();
    } else{
        updateEmployeeRole();
    }
})

function showDepartments(){

}