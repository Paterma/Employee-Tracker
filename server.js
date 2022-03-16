const mysql = require('mysql2');
const dotenv = require('dotenv') //to hide password
const inquirer = require("inquirer");
const cTable = require("console.table");
// const { brotliDecompress } = require('zlib');
const departmentName = [];
const roles = [];
const savedInfo = [];
const finalInfo = [];

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


function begin(){
    initalPrompt()
}

function initalPrompt (){
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

        // let person = new savedEmployee (data.initialQ);
        // const firstEmployee = person.getfirstEmp();
    
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
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"],
            name: "empRole",
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: ["Johnny Depp", "Channing Tatum", "Kristen Wigg", "Sandra Bullock", "Henry Caville", "Amy Shumer", "Chris Hemsworth", "Ali Wong", "Jo Koy"],
            name: "empManager",
        },
    ]).then(data => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${data.firstName}, ${data.lastName}, ${data.empRole}, ${data.empManager};)`)
    addEmployees()
    })
    if (data.initialQ === "Update Employee role") {
    //when UPDATE EMPLOYEE ROLE is selected
    inquirer.prompt([
        { type: "list",
        message: "Which employee's role do you want to update?",
        choices: ["Ron Weasley", "Harry Potter", "Albus Dumbledore", "Hermione Granger", "Draco Malfoy", "Severus Snape", "Rubeus Hagrid"],
        name: "empUpdate",
    },
        { type: "list",
        message: "Which role do you want to assign the selected employee to?",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"],
        name: "updateRole",
},
    ]) .then(data => {
    db.query(`INSERT INTO e_role (name, role_id) VALUES (${data.empUpdate}, ${data.updateRole};)`)
    updateEmployees()
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
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
        name: "roleDept",
    },
    ]).then(data => {
    db.query(`INSERT INTO e_role (title, salary, department_id) VALUES (${data.roleName},${data.roleSalary},${data.roleDept};)`)
    addRole()
    })

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
db.query(`INSERT INTO department (name) VALUES (${data.department};)`)
    addDept()
    })

    } else {
        results.push(finalInfo) //adding the roles to info array
        results.join() //stringing together the array of roles
    } 
    // quit()
    }

//adding an employee or role you have dependencies, you will need to get all the info out of the database, 
function viewEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        //const table = cTable.getTable(results);
        console.table(results)
        });
    initalPrompt()  
} 
function addEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        });
        initalPrompt() 
}
function updateEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        for (let i = 0; i < results.length; i++)
        {roles.push({ name: results[i].empUpdate, value: results[i].updateRole}) 
}
        });
}
function viewRole(){
    db.query('SELECT * FROM e_role', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        });
}
function viewDept(){
    db.query('SELECT * FROM department', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        });
}
        // const viewDept = function () {
        //     // Query the department's table
        //     db.query("SELECT * FROM department", function (err, results) {
        //     console.table(results);
        //     begin();
        //     });
        // };
        
function addDept(){
    db.query('SELECT * FROM department', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        });
}
function quit(){
    db.query('SELECT * FROM employee', function (err, results) {
        // const table = cTable.getTable(results);
        console.table(results)
        // console.log(table)
        });
} //quit()
}
})}

begin()
//calling the function to go through the questions


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