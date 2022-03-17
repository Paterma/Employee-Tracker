const mysql = require('mysql2');
const dotenv = require('dotenv') //to hide password
const inquirer = require("inquirer");
const cTable = require("console.table");
// const { brotliDecompress } = require('zlib');
let departmentName = [];
let roles = [];
let savedInfo = [];
let finalInfo = [];

//need to be able to see the role with employee, need to see dept for creating a role. 
//need to create helper functions that are getting things out of the database (select all), need to return /the array were given back as the choices array in my inquirer question. The only way to see the list is to get it an return it. 
//dont return the array dynamically- do it with an empty variable [] const role = [], role array is the choices



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


// function begin(){
initialPrompt()    
// }

function initialPrompt (){
//initial prompt
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employees", "Update Employee role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        name: "initialQ",
    },
]). then(data => {
    console.log(data)

    if (data.initialQ === "View All Employees") {
        viewEmployees()
    }
    if (data.initialQ === "Add Employees") {

     //when ADD EMPLOYEE is selected
   inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: [{name: "Sales Lead", value: 1}, {name: "Salesperson", value: 2}, {name:"Lead Engineer", value:3} ,{name:"Software Engineer", value: 4}, {name: "Account Manager", value: 5}, {name: "Accountant", value: 6} ,{name: "Legal Team Lead", value: 7} ,{name: "Lawyer", value: 8} ,{name: "Customer Service", value: 9}],
            name: "empRole",
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: [{name: "Ron Weasley", value: 7}, {name: "Harry Potter", value: 1}, {name: "Albus Dumbledore", value: 2}, {name: "Hermione Granger", value: 3}, {name: "Draco Malfoy", value: 4}, {name: "Severus Snape", value: 5}, {name: "Rubeus Hagrid", value: 6}],
            name: "empManager",
        },
    
    ]).then(data => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.firstName, data.lastName, data.empRole, data.empManager], function(err, res){
        console.log(data.empRole)
        if (err) {
            console.log(err)
        } else {
            console.log("success!")
            addEmployees()
        }
    })
    })
    }
    if (data.initialQ === "Update Employee role") {
    //when UPDATE EMPLOYEE ROLE is selected
    inquirer.prompt([
        { type: "list",
        message: "Which employee's role do you want to update?",
        choices: [{name: "Ron Weasley", value: 7}, {name: "Harry Potter", value: 1}, {name: "Albus Dumbledore", value: 2}, {name: "Hermione Granger", value: 3}, {name: "Draco Malfoy", value: 4}, {name: "Severus Snape", value: 5}, {name: "Rubeus Hagrid", value: 6}],
        name: "empUpdate",
    },
        { type: "list",
        message: "Which role do you want to assign the selected employee to?",
        choices: [{name: "Sales Lead", value: 1}, {name: "Salesperson", value: 2}, {name:"Lead Engineer", value:3} ,{name:"Software Engineer", value: 4}, {name: "Account Manager", value: 5}, {name: "Accountant", value: 6} ,{name: "Legal Team Lead", value: 7} ,{name: "Lawyer", value: 8} ,{name: "Customer Service", value: 9}],
        name: "updateRole",
},
    ]) .then(data => { 
    db.query(`UPDATE employee SET role_id=? WHERE id=?`, [data.updateRole, data.empUpdate], function(err, res){
        console.log(data.empRole)
        if (err) {
            console.log(err)
        } else {
            console.log("success!")
        updateEmployees()
        }
    })
    })
}
    if (data.initialQ === "View All Roles") {
        viewRole()
    }

    if (data.initialQ === "Add Role") {
    //when ADD ROLE is selected
inquirer.prompt([
    {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
    },
    {
        type: "list",
        message: "What department does the role belong to?",
        choices: [{name: "Engineering", value: 1}, {name: "Finance", value: 2}, {name: "Legal", value:3}, {name: "Sales", value: 4}, {name: "Service", value: 5}],
        name: "roleDept",
    },

    ]).then(data => {
        db.query(`INSERT INTO e_role (title, salary, department_id) VALUES (?, ?, ?)`, [data.roleName, data.roleSalary, data.roleDept], function(err, res){ 
            console.log(data.empRole)
            if (err) {
                console.log(err)
            } else {
                console.log("success!")
                addRole()
            }
        })
    })
}
    if (data.initialQ === "View All Departments") {
    viewDept()
    }

    if (data.initialQ === "Add Department") {
        //when ADD DEPARTMENT is selected
inquirer.prompt([
    {
        type: "input",
        message: "What is the name of the department?",
        name: "department",
    },
    
]).then(data => {
db.query(`INSERT INTO department (name) VALUES (?)`, [data.department], function(err, res){
        console.log(data.department)
        if (err) {
            console.log(err)
        } else {
            console.log("success!")
            addDept()
        }
})
})

    } else {
        // results.push(finalInfo) //adding the roles to info array
        // results.join() //stringing together the array of roles
        // console.log("Goodbye!")
    } 
    // quit()

//adding an employee or role you have dependencies, you will need to get all the info out of the database,
//creating my functions for each different prompt 
function viewEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        //const table = cTable.getTable(results);
        console.table(results)
        initialPrompt() 
        });
    
} 
function addEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results) 
        initialPrompt() 
        });
    
}
function addRole(){
    db.query('SELECT * FROM e_role', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results) 
        initialPrompt()
        });
    
}
function updateEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        // for (let i = 0; i < results.length; i++)
        // {roles.push({ name: results[i].empUpdate, value: results[i].updateRole}) 
initialPrompt()
    });
    
}
function viewRole(){
    db.query('SELECT * FROM e_role', function (err, results) {
        // db.query("SELECT e_role.title, e_role.id, e_role.salary, department.department_id FROM e_role JOIN department ON e_role.department_id = department.department_id;"
        // const table = cTable.getTable(results);
        console.table(results)
        initialPrompt()
        });
        
}
function viewDept(){
    db.query('SELECT * FROM department', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        initialPrompt()
        });
    
}

function addDept(){
    db.query('SELECT * FROM department', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        initialPrompt()
        });
}
function quit(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        // console.log(table)
        });
 //quit()
}
})}


//calling the function to go through the inital question
// begin()



// db.query(`UPDATE INTO employees SET ? WHERE e_role + employee`,
// {first_name: data.firstName,
// last_name: data.lastName,
// role_id: data.empRole,
// manager_id: data.empManager,
// },
// function (err) {
//     if(err) throw err;
//     console.log ("Success")
// }
// );


//[{name: thing you see, value: id}]
//for (let i = 0; i < results.length; i++) {
//roles.push({name: results[i].title, value:results[i].id }) 
//}

// .then(function (answers) {
//     console.log(answers);
//     db.query(
//       "INSERT INTO departments SET ?",
//       {
//         department_name: answers.newDeptName,
//       },
//       function (error) {
//         if (error) throw error;
//         console.log("new department added");
//       }
//     );
//   });