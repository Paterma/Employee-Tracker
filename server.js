const mysql = require('mysql2');
const dotenv = require('dotenv') //to hide password
const inquirer = require("inquirer");
const cTable = require("console.table")
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
};

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

        //
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
        let person = new addEmployee1 (data.firstName, data.lastName, data.empRole, data.empManager);
        const addedEmp = person.getAddedEmp();
        savedInfo.push(finalInfo)
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
        let person = new updateEmployeeRole (data.empUpdate, data.updateRole);
        const updateEmp = person.getupdatedEmp();
    updateEmp.push(savedInfo)
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
        let person = new addRole1 (data.roleName, data.roleSalary, data.roleDept);
        const addRole = person.getNewRole();
    addRole.push(savedInfo)
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
        message: "What is the namr of the department?",
        name: "department",
    },
    
]).then(data => {
    const person = new newDeptartment (data.department);
    const newDept = person.getNewDept();
newDept.push(savedInfo)
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
} //quit()
}
})}


//calling the function to go through the questions
begin()

//[{name: thing you see, value: id}]
//for (let i = 0; i < results.length; i++) {
//roles.push({name: results[i].title, value:results[i].id }) 
//}

//    .then((data) => {
//     if (data.init_Choice === "Add a new Department?") {
//         const department = new Department(data.getId, data.getDepartment_name)
//         return newDepartment.push(department)
//     }
//     console.log(`${data.getDepartment_name} DEPARTMENT HAS BEEN CREATED!`)
//     console.info(newDepartment, 'line 43');
// })

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

