const mysql = require('mysql2');
const dotenv = require('dotenv') //to hide password
const inquirer = require("inquirer");
const cTable = require("console.table")

// Connect to database
const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'work_info'
},
console.log(`Connected to the work_info database.`)
);

//initial prompt
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employees", "Update Employee role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        name: "initialQ",
    },
]).then(data => {
    console.log(data)
    if (data.initialQ === "View All Employees") {
        viewEmployees()
    }
    if (data.initialQ === "Add Employees") {
        addEmployees()
    }
    if (data.initialQ === "Update Employee role") {
        updateEmployees()
    }
    if (data.initialQ === "View All Roles") {
        viewRole()
    }
    if (data.initialQ === "Add Role") {
        addRole()
    }
    if (data.initialQ === "View All Departments") {
        viewDept()
    }
    if (data.initialQ === "Add Department") {
        addDept()
    }
    if (data.initialQ === "Quit") {
        quit()
    }
})

//adding an employee or role you have dependencies, you will need to get all the info out of the database, 


function viewEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function addEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function updateEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function viewRole(){
    db.query('SELECT * FROM e_role', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function viewDept(){
    db.query('SELECT * FROM department', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function addDept(){
    db.query('SELECT * FROM department', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
function quit(){
    db.query('SELECT * FROM employee', function (err, results) {
        const table = cTable.getTable(results);
        console.log(table)
        });
}
// Hardcoded query: DELETE FROM course_names WHERE id = 3;
// var departmentName = 

// db.query(`DELETE FROM work_info WHERE id = ?`, 3, (err, result) => {
// if (err) {
//     console.log(err);
// }
// console.log("Department added!");
// });


// db.query('SELECT * FROM employee', function (err, results) {
// console.table(results);
// });


// Default response for any other request (Not Found)


//when ADD DEPARTMENT is selected
// inquirer.prompt([
//     {
//         type: "input",
//         message: "What is the namr of the department?",
//         name: "department",
//     },
// ])

// //when ADD ROLE is selected
// inquirer.prompt([
//     {
//         type: "input",
//         message: "What is the name of the role?",
//         name: "roleName",
//     },
//     {
//         type: "input",
//         message: "What is the salary of the role?",
//         name: "roleSalary",
//     },
//     {
//         type: "list",
//         message: "What department does the role belong to?",
//         choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
//         name: "roleDept",
//     },
//     ])

//     //when ADD EMPLOYEE is selected
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What is the employee's first name?",
//             name: "firstName",
//         },
//         {
//             type: "input",
//             message: "What is the employee's last name?",
//             name: "lastName",
//         },
//         {
//             type: "list",
//             message: "What is the employee's role?",
//             choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"],
//             name: "lastName",
//         },
//         {
//             type: "list",
//             message: "Who is the employee's manager?",
//             choices: ["Johnny Depp", "Channing Tatum", "Kristen Wigg", "Sandra Bullock", "Henry Caville", "Amy Shumer", "Chris Hemsworth", "Ali Wong", "Jo Koy"],
//             name: "empManager",
//         },
//     ])

//     //when UPDATE EMPLOYEE ROLE is selected
//     inquirer.prompt([
//     { type: "list",
//         message: "Which employee's role do you want to update?",
//         choices: ["Johnny Depp", "Channing Tatum", "Kristen Wigg", "Sandra Bullock", "Henry Caville", "Amy Shumer", "Chris Hemsworth", "Ali Wong", "Jo Koy"],
//         name: "empUpdate",
//     },
//     { type: "list",
//     message: "Which role do you want to assign the selected employee to?",
//     choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"],
//     name: "updateRole",
// },
//     ])



    // .then((data) => {
    //     const html = ``
    // }
